<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">Profile Comparison Example</v-card-title>
        <v-card-text>
          <p>Country profiling as an example, with GDP per capita & continent as facet, and head of government, official language, currency, and capital for the attribute defining completeness.</p>

          <div class="bar-chart">
            <BarChart :chart-data="datacollection" :options="{ maintainAspectRatio: false }"/>
          </div>

          <h2>Profile 1</h2>
          <v-layout row wrap>
            <v-flex d-flex xs8>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-subheader>Continent</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="continents"
                    v-model="continent1"
                    class="input-group--focused"
                    item-value="value"
                    item-text="text"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-subheader>GDP</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="gdps"
                    v-model="gdp1"
                    class="input-group--focused"
                    item-value="value"
                    item-text="text"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs3>
              <v-progress-circular
                :size="250"
                :width="30"
                :rotate="-90"
                :value="score1"
                color=blue
              >
                <h1> {{ score1 }}% </h1>
              </v-progress-circular>
            </v-flex>
          </v-layout>

          <h2>Profile 2</h2>
          <v-layout row wrap>
            <v-flex d-flex xs8>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-subheader>Continent</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="continents"
                    v-model="continent2"
                    class="input-group--focused"
                    item-value="value"
                    item-text="text"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-subheader>GDP</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="gdps"
                    v-model="gdp2"
                    class="input-group--focused"
                    item-value="value"
                    item-text="text"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs3>
              <v-progress-circular
                :size="250"
                :width="30"
                :rotate="-90"
                :value="score2"
                color=orange
              >
                <h1> {{ score2 }}% </h1>
              </v-progress-circular>
            </v-flex>
          </v-layout>

          <v-btn @click="compareProfile()" color="success"> Post Query </v-btn>

          <v-expansion-panel popout>
            <v-expansion-panel-content>
              <div slot="header">Profile 1</div>
              <v-card>
                <v-data-table
                  :headers="headers"
                  :items="countries1"
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
                    <td class="text-xs-right">{{ (100 * (Object.keys(props.item).length - 2) / properties.length)+'%' }}</td>
                  </template>
                </v-data-table>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">Profile 2</div>
              <v-card>
                <v-data-table
                  :headers="headers"
                  :items="countries2"
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
                    <td class="text-xs-right">{{ (100 * (Object.keys(props.item).length - 2) / properties.length)+'%' }}</td>
                  </template>
                </v-data-table>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BarChart from '~/components/BarChart.vue'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      gdp1: '?gdp < 5000',
      continent1: 'Q15',
      gdp2: '?gdp < 5000',
      continent2: 'Q48',
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
        { text: 'Inception', value: 'inceptionExist' },
        { text: 'Completeness Percentage', value: 'completenessPercentage' }
      ],
      continents: [
        {value: 'Q15', text: 'Africa'},
        {value: 'Q48', text: 'Asia'},
        {value: 'Q46', text: 'Europe'},
        {value: 'Q538', text: 'Oceania'},
        {value: 'Q49', text: 'North America'},
        {value: 'Q18', text: 'South America'}
      ],
      gdps: [
        {value: '?gdp < 5000', text: 'Low'},
        {value: '?gdp >= 5000 && ?gdp <= 10000', text: 'Mid'},
        {value: '?gdp > 10000', text: 'High'}
      ],
      datacollection: null,
      datasets: [],
      barColor1: 'blue',
      barcolor2: 'orange',
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }
  },
  computed: {
    countries1 () {
      return this.$store.state.countries1
    },
    countries2 () {
      return this.$store.state.countries2
    },
    properties () {
      return this.$store.state.properties
    },
    barChartData () {
      return this.$store.state.barChartData
    },
    score1 () {
      return this.$store.state.score1
    },
    score2 () {
      return this.$store.state.score2
    }
  },
  methods: {
    async postQuery (continent, gdp, color, setTable, setScore) {
      var query = `
        SELECT ?country ?countryLabel ?headOfGovExist ?capExist ?curExist ?langExist ?inceptionExist
        WHERE {
        ?country wdt:P31 wd:Q6256.
        ?country wdt:P30 wd:${continent}.
        ?country wdt:P2132 ?gdp.
        FILTER (${gdp})
        OPTIONAL {BIND ("TRUE" AS ?headOfGovExist) FILTER EXISTS{?country wdt:P6 ?headOfGov}}
        OPTIONAL {BIND ("TRUE" AS ?capExist) FILTER EXISTS{?country wdt:P36 ?cap}}
        OPTIONAL {BIND ("TRUE" AS ?curExist) FILTER EXISTS{?country wdt:P38 ?cur}}
        OPTIONAL {BIND ("TRUE" AS ?langExist) FILTER EXISTS{?country wdt:P37 ?lang}}
        OPTIONAL {BIND ("TRUE" AS ?inceptionExist) FILTER EXISTS{?country wdt:P571 ?inception}}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
      `
      var response = await this.$axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
      console.log(response)
      var countries = response.data.results.bindings
      this.$store.commit(setTable, countries)
      const reducer = function (acc, country) {
        var exist = Object.keys(country).length - 3
        acc[exist] = acc[exist] + 1 || 1
        return acc
      }
      var acc = Array.apply(null, Array(this.properties.length)).map(Number.prototype.valueOf, 0)
      console.log(acc)
      var chartData = countries.reduce(reducer, acc)

      var score = 0
      var div = 100 / chartData.length
      chartData.forEach(function (val, i) {
        var weight = (i + 1) * div
        score += (weight * val)
        console.log(weight, val)
      })
      score /= countries.length
      this.$store.commit(setScore, parseFloat(score.toFixed(2)))

      this.datasets.push({
        label: `${continent} - ${gdp}`,
        backgroundColor: color,
        data: chartData
      })
    },
    async compareProfile () {
      this.datasets = []
      await this.postQuery(this.continent1, this.gdp1, this.barColor1, 'SET_COUNTRIES1', 'SET_SCORE1')
      await this.postQuery(this.continent2, this.gdp2, this.barcolor2, 'SET_COUNTRIES2', 'SET_SCORE2')
      console.log('profile1 done')
      this.datacollection = {
        labels: this.properties.map((x) => `${100 * x / this.properties.length}%`),
        datasets: this.datasets
      }
      console.log(this.datasets)
    }
  },
  mounted: function () {
    this.compareProfile()
  }
}
</script>
