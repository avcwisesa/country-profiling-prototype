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
          <br>
          <v-layout row wrap>
            <v-flex xs8>
              <v-layout v-for="facet in facets" v-bind:key="facet.code" row wrap>
                  <v-flex xs6>
                      <v-subheader> {{facet.name}} ({{facet.code}}) </v-subheader>
                  </v-flex>
                  <v-flex xs6>
                      <v-select :items="facetOptions[facet.code]" v-model=facetValue[facet.code] item-text="name" item-value="code" autocomplete
                          class="input-group--focused"
                      ></v-select>
                  </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs12>
                  <h3 class="text-xs-center"> &nbsp; &nbsp;Average Completeness</h3>
                </v-flex>
                <v-flex xs3></v-flex>
                <v-flex x5>
                  <v-progress-circular class="text-xs-center"
                    :size="200"
                    :width="25"
                    :rotate="-90"
                    :value="score1"
                    color=blue
                  >
                    <h1> {{ score1 }}% </h1>
                  </v-progress-circular>
                </v-flex>
                <v-flex xs12>
                  <h3 class="text-xs-center">Total Entity: {{ countries.length }}</h3>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs2>
              <v-btn @click="postQuery()" color="success"> Post Query </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-progress-circular v-if="loading" :width="3" :size="50" indeterminate color="green"></v-progress-circular>
            </v-flex>
          </v-layout>

          <v-data-table
            :headers="headers"
            :items="countries"
            hide-actions
            class="elevation-1"
            disable-initial-sort
          >
            <template slot="items" slot-scope="props">
              <td v-for="attr in attributeVariables" v-bind:key="attr.code" v-if="props.item[attr]" class="text-xs-right">
                <div v-if="attr === 'classLabel'">
                  <a v-bind:href="props.item['class'].value">
                    <v-icon>link</v-icon>
                  </a>
                  {{props.item[attr].value}}
                </div>
                <div v-else><v-icon color="green light">check</v-icon></div>
              </td>
              <td v-else class="text-xs-right">
                <v-icon color="red">close</v-icon>
              </td>

              <td class="text-xs-right">{{ (100 * (Object.keys(props.item).length - 2) / attributes.length).toFixed(2)+'%' }}</td>
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
    await store.dispatch('FETCH_FACET_OPTIONS')
  },
  components: {
    BarChart
  },
  data () {
    return {
      facetValue: {},
      query: '',
      datacollection: null,
      facetOptionsData: {},
      loading: false
    }
  },
  computed: {
    countries () {
      return this.$store.state.countries1
    },
    headers () {
      var ret = [this.$store.state.class]
      ret = ret.concat(this.$store.state.attributes)
      ret = ret.map(obj => {
        return { text: obj.name + ' (' + obj.code + ')' }
      })
      return ret.concat({ text: 'completeness percentage' })
    },
    attributeVariables () {
      var attrs = this.$store.state.attributes
      attrs = attrs.map(obj => obj.code + 'Exist')
      return ['classLabel'].concat(attrs)
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
    },
    facetOptions () {
      return this.facetOptionsData
    },
    subclass () {
      return this.$store.state.subclass
    },
    score1 () {
      return this.$store.state.score1
    }
  },
  methods: {
    postQuery () {
      this.loading = true
      var attributeVarQuery = this.attributeVariables.reduce(function (acc, attr) {
        return acc + ' ?' + attr
      }, '')
      var filterExistQuery = this.attributes.reduce(function (acc, attr) {
        return acc + ` OPTIONAL {BIND ("TRUE" AS ?${attr.code}Exist) FILTER EXISTS{?class wdt:${attr.code} ?${attr.code}}}`
      }, '')
      var facetValue = this.facetValue
      var facetQuery = this.facets.reduce(function (acc, attr) {
        return acc + ` ?class wdt:${attr.code} wd:${facetValue[attr.code] || 'Q0'}.`
      }, '')
      var includeSubclass = ''
      if (this.subclass) includeSubclass = '/wdt:P279*'

      var query = `
        SELECT DISTINCT ?class ${attributeVarQuery}
        WHERE {
        ?class wdt:P31${includeSubclass} wd:${this.class.code}.
        ${facetQuery}
        ${filterExistQuery}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
      `

      this.$axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
        .then((response) => {
          var countries = response.data.results.bindings
          this.$store.commit('SET_COUNTRIES1', countries)

          const reducer = function (acc, country) {
            var exist = Object.keys(country).length - 2
            acc[exist] = acc[exist] + 1 || 1
            return acc
          }
          var attributes = this.attributes.concat([''])
          var acc = Array.apply(null, Array(attributes.length)).map(Number.prototype.valueOf, 0)

          var chartData = countries.reduce(reducer, acc)

          var score = 0
          var div = 100 / chartData.length
          chartData.forEach(function (val, i) {
            var weight = (i + 1) * div
            score += (weight * val)
            console.log(weight, val)
          })
          score /= countries.length
          this.$store.commit('SET_SCORE1', parseFloat(score.toFixed(2)))

          this.datacollection = {
            labels: attributes.map((_, x) => `${(100 * (x) / this.attributes.length).toFixed(2)}%`),
            datasets: [
              {
                label: 'Amount of class entity',
                backgroundColor: '#41b883',
                data: chartData
              }
            ]
          }

          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fillFacets () {
      var facetOptionsResults = this.facets.map(async (facet) => {
        var includeSubclass = ''
        if (this.subclass) includeSubclass = '/wdt:P279*'
        var query = `
        SELECT DISTINCT ?facet ?facetLabel ?${facet.code}
            WHERE {
            ?entity wdt:P31${includeSubclass} wd:${this.class.code}.
            ?entity wdt:${facet.code} ?facet.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
            }
        `
        return this.$axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
      })
      Promise.all(facetOptionsResults).then((completed) => {
        var tmp = {}
        completed.forEach(function (response) {
          tmp[response.data.head.vars[2]] = response.data.results.bindings.map((obj) => {
            return {
              code: obj['facet']['value'].split('/')[4],
              name: obj['facetLabel']['value']
            }
          }).sort(function (a, b) {
            if (a.name > b.name) {
              return 1
            } else if (a.name < b.name) {
              return -1
            } else {
              return 0
            }
          })
        })
        this.facetOptionsData = tmp
      })
    }
  },
  mounted: async function () {
    await this.fillFacets()
    this.postQuery()
    // console.log(this.facetOptionsData)
    this.$forceUpdate()
  }
}
</script>
