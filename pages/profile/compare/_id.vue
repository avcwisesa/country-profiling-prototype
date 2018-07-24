<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <!-- <img src="/v.png" alt="Vuetify.js" class="mb-5" /> -->
      </div>
      <v-card>
        <v-card-title class="headline"> {{profileName}} Profile Comparison </v-card-title>
        <v-card-text>
          <div class="bar-chart">
            <h2>Completeness Distribution</h2>
            <v-card-text>Amount of entities according to completeness score</v-card-text>
            <BarChart :chart-data="datacollection" :options="chartOptions"/>
          </div>
          <h2>Profile 1</h2>
          <v-layout row wrap>
            <v-flex xs8>
              <v-layout v-for="facet in facets" v-bind:key="facet.code" row wrap>
                  <v-flex xs6>
                      <v-subheader> {{facet.name}} ({{facet.code}}) </v-subheader>
                  </v-flex>
                  <v-flex xs6>
                      <v-select :items="facetOptions[facet.code]" v-model="facetValue[1][facet.code]" item-text="name" item-value="code" autocomplete
                          class="input-group--focused" placeholder="any"
                      ></v-select>
                  </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs12>
                  <h3 class="text-xs-center"> &nbsp; &nbsp;Average Completeness Score</h3>
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
                  <h3 class="text-xs-center">Total number of entities: {{ countries1.length }}</h3>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider class="my-4"></v-divider>
          <h2>Profile 2</h2>
          <v-layout row wrap>
            <v-flex xs8>
              <v-layout v-for="facet in facets" v-bind:key="facet.code" row wrap>
                  <v-flex xs6>
                      <v-subheader> {{facet.name}} ({{facet.code}}) </v-subheader>
                  </v-flex>
                  <v-flex xs6>
                      <v-select :items="facetOptions[facet.code]" v-model="facetValue[2][facet.code]" item-text="name" item-value="code" autocomplete
                          class="input-group--focused" placeholder="any"
                      ></v-select>
                  </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs12>
                  <h3 class="text-xs-center"> &nbsp; &nbsp;Average Completeness Score</h3>
                </v-flex>
                <v-flex xs3></v-flex>
                <v-flex x5>
                  <v-progress-circular class="text-xs-center"
                    :size="200"
                    :width="25"
                    :rotate="-90"
                    :value="score1"
                    color=orange
                  >
                    <h1> {{ score2 }}% </h1>
                  </v-progress-circular>
                </v-flex>
                <v-flex xs12>
                  <h3 class="text-xs-center">Total number of entities: {{ countries2.length }}</h3>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-btn @click="compareProfile()" color="success"> Post Query </v-btn>

          <v-card-title class="headline"> Completeness table </v-card-title>
          <v-card-text>Completeness details of all entities within the profile</v-card-text>

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
  async fetch ({ store, params }) {
    await store.dispatch('FETCH_PROFILE_BY_ID', params.id)
    await store.dispatch('FETCH_FACET_OPTIONS')
  },
  components: {
    BarChart
  },
  data () {
    return {
      query: '',
      datacollection: null,
      datasets: [],
      barColor1: 'blue',
      barcolor2: 'orange',
      facetValue: { '1': { 'any': 'any' }, '2': { 'any': 'any' } },
      facetOptionsData: {},
      loading: false,
      chartOptions: {
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    }
  },
  computed: {
    profileName () {
      return this.$store.state.profileName
    },
    headers () {
      var ret = [this.$store.state.class]
      ret = ret.concat(this.$store.state.attributes)
      ret = ret.map(obj => {
        return { text: obj.name + ' (' + obj.code + ')', value: obj.code + '_key' }
      })
      return ret.concat({ text: 'completeness percentage', value: 'percentage_key' })
    },
    class () {
      return this.$store.state.class
    },
    facets () {
      return this.$store.state.facets
    },
    facetOptions () {
      return this.facetOptionsData
    },
    attributes () {
      return this.$store.state.attributes
    },
    attributeVariables () {
      var attrs = this.$store.state.attributes
      attrs = attrs.map(obj => obj.code + 'Exist')
      return ['classLabel'].concat(attrs)
    },
    countries1 () {
      return this.$store.state.countries1
    },
    countries2 () {
      return this.$store.state.countries2
    },
    barChartData () {
      return this.$store.state.barChartData
    },
    datacollectionComputed () {
      return this.datacollection
    },
    subclass () {
      return this.$store.state.subclass
    },
    score1 () {
      return this.$store.state.score1
    },
    score2 () {
      return this.$store.state.score2
    }
  },
  methods: {
    async postQuery (id, barColor, setTable, setScore) {
      this.loading = true
      var attributeVarQuery = this.attributeVariables.reduce(function (acc, attr) {
        return acc + ' ?' + attr
      }, '')
      var filterExistQuery = this.attributes.reduce(function (acc, attr) {
        return acc + ` OPTIONAL {BIND ("TRUE" AS ?${attr.code}Exist) FILTER EXISTS{?class wdt:${attr.code} ?${attr.code}}}`
      }, '')
      var facetValue = this.facetValue[id]
      var facetQuery = this.facets.reduce(function (acc, attr) {
        if (facetValue[attr.code] === 'any') {
          return acc.concat({ code: attr.code, value: '?' + facetValue[attr.code] })
        } else {
          return acc.concat({ code: attr.code, value: 'wd:' + facetValue[attr.code] })
        }
      }, [])
      console.log('FC')
      console.log(facetQuery)
      var facetQueryString = facetQuery.reduce(function (acc, attr) {
        if (attr.value === 'wd:undefined') {
          return acc + ` ?class wdt:${attr.code} ?${attr.code}.`
        } else {
          return acc + ` ?class wdt:${attr.code} ${attr.value}.`
        }
      }, '')
      var includeSubclass = ''
      if (this.subclass) includeSubclass = '/wdt:P279*'

      var query = `
        SELECT DISTINCT ?class ${attributeVarQuery}
        WHERE {
        ?class wdt:P31${includeSubclass} wd:${this.class.code}.
        ${facetQueryString}
        ${filterExistQuery}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
      `

      this.$axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
        .then((response) => {
          var countries = response.data.results.bindings
          this.$store.commit(setTable, countries)

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
          })
          score /= countries.length
          this.$store.commit(setScore, parseFloat(score.toFixed(2)))

          this.datasets.push({
            label: `Facet ${id}`,
            backgroundColor: barColor,
            data: chartData
          })

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
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en,id,de,it". }
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
          }).concat({ name: 'any', code: 'any' }).sort(function (a, b) {
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
    },
    async compareProfile () {
      this.datasets = []
      await this.postQuery(1, this.barColor1, 'SET_COUNTRIES1', 'SET_SCORE1')
      await this.postQuery(2, this.barcolor2, 'SET_COUNTRIES2', 'SET_SCORE2')
      console.log('profile1 done')
      var attributes = this.attributes.concat([''])
      this.datacollection = {
        labels: attributes.map((_, x) => `${(100 * (x) / this.attributes.length).toFixed(2)}%`),
        datasets: this.datasets
      }
      console.log(this.datasets)
      console.log(this.datacollection)
    }
  },
  mounted: async function () {
    await this.compareProfile()
    this.fillFacets()
    this.$nextTick(() => {
      this.$forceUpdate()
    })
  }
}
</script>
