<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">Welcome</v-card-title>
        <v-card-text>
          <p>Country profiling as an example, with GDP per capita & continent as facet, and head of government, official language, currency, and capital for the attribute defining completeness.</p>

          <div class="bar-chart">
            <BarChart :chart-data="datacollection" :options="{ maintainAspectRatio: false }"/>
          </div>

          <div>
            <h3>Continent</h3>
            <v-btn-toggle v-model="continent">
              <v-btn flat value="Q15">
                Africa
              </v-btn>
              <v-btn flat value="Q48">
                Asia
              </v-btn>
              <v-btn flat value="Q46">
                Europe
              </v-btn>
              <v-btn flat value="Q538">
                Oceania
              </v-btn>
              <v-btn flat value="Q18">
                North America
              </v-btn>
              <v-btn flat value="Q49">
                South America
              </v-btn>
            </v-btn-toggle>
          </div>
          <div>
            <h3>GDP</h3>
            <v-btn-toggle v-model="gdp">
              <v-btn flat value="?gdp < 5000">
                Low
              </v-btn>
              <v-btn flat value="?gdp >= 5000 && ?gdp <= 10000">
                Mid
              </v-btn>
              <v-btn flat value="?gdp > 10000">
                High
              </v-btn>
            </v-btn-toggle>
          </div>
          <v-btn @click="postQuery()" color="success"> Post Query </v-btn>
          <v-btn @click="modifyChart()" color="info"> change! </v-btn>

          <v-data-table
            :headers="headers"
            :items="countries"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.countryLabel.value }}</td>
              <td v-if="props.item.headOfGovExist" class="text-xs-right">{{ props.item.headOfGovExist.value }}</td>
              <td v-else class="text-xs-right">Empty</td>
              <td v-if="props.item.capExist" class="text-xs-right">{{ props.item.capExist.value }}</td>
              <td v-else class="text-xs-right">Empty</td>
              <td v-if="props.item.curExist" class="text-xs-right">{{ props.item.curExist.value }}</td>
              <td v-else class="text-xs-right">Empty</td>
              <td v-if="props.item.langExist" class="text-xs-right">{{ props.item.langExist.value }}</td>
              <td v-else class="text-xs-right">Empty</td>
              <td v-if="props.item.inceptionExist" class="text-xs-right">{{ props.item.inceptionExist.value }}</td>
              <td v-else class="text-xs-right">Empty</td>
              <td class="text-xs-right">{{ Object.keys(props.item).length - 2 }}</td>
            </template>
          </v-data-table>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BarChart from '~/components/BarChart.vue'

export default {
  fetch ({ store }) {
    store.commit('SET_CHART_LABEL')
  },
  components: {
    BarChart
  },
  data () {
    return {
      gdp: '?gdp < 5000',
      continent: 'Q15',
      query: '',
      headers: [
        {
          text: 'Country',
          align: 'left',
          value: 'country'
        },
        { text: 'Head of Goverment', value: 'headOfGovExist' },
        { text: 'Capital', value: 'capExist' },
        { text: 'Currency', value: 'curExist' },
        { text: 'Official Language', value: 'langExist' },
        { text: 'Inception', value: 'inceptionExist' }
      ],
      datacollection: null
    }
  },
  computed: {
    countries () {
      return this.$store.state.countries
    },
    properties () {
      return this.$store.state.properties
    },
    barChartData () {
      return this.$store.state.barChartData
    }
  },
  methods: {
    postQuery () {
      var query = `
        SELECT ?country ?countryLabel ?headOfGovExist ?capExist ?curExist ?langExist ?inceptionExist
        WHERE {
        ?country wdt:P31 wd:Q6256.
        ?country wdt:P30 wd:${this.continent}.
        ?country wdt:P2132 ?gdp.
        FILTER (${this.gdp})
        OPTIONAL {BIND ("TRUE" AS ?headOfGovExist) FILTER EXISTS{?country wdt:P6 ?headOfGov}}
        OPTIONAL {BIND ("TRUE" AS ?capExist) FILTER EXISTS{?country wdt:P36 ?cap}}
        OPTIONAL {BIND ("TRUE" AS ?curExist) FILTER EXISTS{?country wdt:P38 ?cur}}
        OPTIONAL {BIND ("TRUE" AS ?langExist) FILTER EXISTS{?country wdt:P37 ?lang}}
        OPTIONAL {BIND ("TRUE" AS ?inceptionExist) FILTER EXISTS{?country wdt:P571 ?inception}}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
      `
      console.log(query)
      this.$axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
        .then((response) => {
          console.log(response)
          var countries = response.data.results.bindings
          this.$store.commit('SET_COUNTRIES', countries)
          const reducer = function (acc, country) {
            var exist = Object.keys(country).length - 3
            acc[exist] = acc[exist] + 1 || 1
            return acc
          }
          var acc = Array.apply(null, Array(this.properties.length)).map(Number.prototype.valueOf, 0)
          console.log(acc)
          var chartData = countries.reduce(reducer, acc)

          this.datacollection = {
            labels: this.properties.map((x) => `${100 * x / this.properties.length}%`),
            datasets: [
              {
                label: 'Amount of countries',
                backgroundColor: '#41b883',
                data: chartData
              }
            ]
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.postQuery()
  }
}
</script>
