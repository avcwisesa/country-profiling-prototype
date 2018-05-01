export const strict = false
export const state = () => ({
  countries: [],
  properties: [1, 2, 3, 4, 5],
  barChartData: {
    labels: [],
    datasets: [
      {
        label: 'Amount of countries',
        backgroundColor: '#41b883',
        data: [4, 3, 5, 7, 3]
      }
    ]
  },
  error: null
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  SET_FAILURE (state, error) {
    state.error = error
  },
  SET_COUNTRIES (state, countries) {
    state.countries = countries
  },
  SET_CHART_LABEL (state, labels) {
    state.barChartData.labels = state.properties.map((x) => `${100 * x / state.properties.length}%`)
  },
  SET_CHART_DATA (state, data) {
    state.barChartData.datasets[0].data = data
  }
}

export const actions = {
  SET_CHART ({ commit }) {
    commit('SET_CHART_LABEL')
  },
  POST_QUERY ({ commit }, query) {
    return this.$axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
      .then((response) => {
        console.log(response)
        var countries = response.data.results.bindings
        commit('SET_COUNTRIES', countries)
        const reducer = function (acc, country) {
          var exist = Object.keys(country).length - 3
          acc[exist] = acc[exist] + 1 || 1
          return acc
        }
        var acc = Array.apply(null, Array(state().properties.length)).map(Number.prototype.valueOf, 0)
        console.log(acc)
        var chartData = countries.reduce(reducer, acc)
        commit('SET_CHART_DATA', chartData)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_FAILURE', error)
      })
  }
}
