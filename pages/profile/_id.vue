<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <!-- <img src="/v.png" alt="Vuetify.js" class="mb-5" /> -->
      </div>
      <v-card>
        <v-card-title class="headline"> {{profileName}} </v-card-title>
        <v-card-text>
          <div class="bar-chart">
            <h2>Bar Chart</h2>
            <BarChart :chart-data="datacollection" :options="{ maintainAspectRatio: false }"/>
          </div>

            <v-layout v-for="facet in facets" v-bind:key="facet.code" row wrap>
                <v-flex xs6>
                    <v-subheader> {{facet.name}} </v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-text-field v-model=facetValue[facet.code]
                        class="input-group--focused"
                    ></v-text-field>
                </v-flex>
            </v-layout>

          <v-btn @click="postQuery()" color="success"> Post Query </v-btn>

          <v-data-table
            :headers="headers"
            :items="countries"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td v-for="attr in attributeVariables" v-bind:key="attr.code" v-if="props.item[attr]" class="text-xs-right">{{ props.item[attr].value }}</td>
              <td v-else class="text-xs-right">Empty</td>

              <td class="text-xs-right">{{ (100 * (Object.keys(props.item).length - 2) / properties.length).toFixed(2)+'%' }}</td>
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
  async fetch ({ store, params }) {
    await store.dispatch('FETCH_PROFILE_BY_ID', params.id)
  },
  components: {
    BarChart
  },
  data () {
    return {
      facetValue: {},
      query: '',
      datacollection: null
    }
  },
  computed: {
    countries () {
      return this.$store.state.countries1
    },
    headers () {
      var ret = [this.$store.state.class]
      ret = ret.concat(this.$store.state.attributes)
      ret = ret.concat({ name: 'completeness percentage' })
      return ret.map(obj => {
        return { text: obj.name }
      })
    },
    attributeVariables () {
      var attrs = this.$store.state.attributes
      attrs = attrs.map(obj => obj.code + 'Exist')
      return ['classLabel'].concat(attrs)
    },
    properties () {
      return this.$store.state.properties
    },
    barChartData () {
      return this.$store.state.barChartData
    },
    class () {
      return this.$store.state.class
    },
    facets () {
      return this.$store.state.facets
    },
    attributes () {
      return this.$store.state.attributes
    },
    profileName () {
      return this.$store.state.profileName
    }
  },
  methods: {
    postQuery () {
      console.log(this.attributeVariables)
      var attributeVarQuery = this.attributeVariables.reduce(function (acc, attr) {
        return acc + ' ?' + attr
      }, '')
      var filterExistQuery = this.attributes.reduce(function (acc, attr) {
        return acc + ` OPTIONAL {BIND ("TRUE" AS ?${attr.code}Exist) FILTER EXISTS{?class wdt:${attr.code} ?${attr.code}}}`
      }, '')
      var facetValue = this.facetValue
      var facetQuery = this.facets.reduce(function (acc, attr) {
        console.log(facetValue)
        return acc + ` ?class wdt:${attr.code} wd:${facetValue[attr.code] || 'Q0'}.`
      }, '')
      console.log(filterExistQuery)
      var query = `
        SELECT ?class ${attributeVarQuery}
        WHERE {
        ?class wdt:P31 wd:${this.class.code}.
        ${facetQuery}
        ${filterExistQuery}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
      `
      console.log(query)
      this.$axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
        .then((response) => {
          console.log(response)
          var countries = response.data.results.bindings
          this.$store.commit('SET_COUNTRIES1', countries)
          console.log(countries)
          const reducer = function (acc, country) {
            var exist = Object.keys(country).length - 3
            acc[exist] = acc[exist] + 1 || 1
            return acc
          }
          var acc = Array.apply(null, Array(this.properties.length)).map(Number.prototype.valueOf, 0)
          console.log(acc)
          var chartData = countries.reduce(reducer, acc)

          this.datacollection = {
            labels: this.properties.map((x) => `${(100 * x / this.properties.length).toFixed(2)}%`),
            datasets: [
              {
                label: 'Amount of class entity',
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
