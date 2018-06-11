import axios from 'axios'

export const strict = false
export const state = () => ({
  class: {},
  classElements: [],
  facets: [],
  facetOptions: {},
  attributes: [],
  score1: 0,
  score2: 0,
  countries1: [],
  countries2: [],
  properties: [1, 2, 3, 4, 5, 6],
  error: null,
  profileName: '',
  profileClass: '',
  profiles: [],
  suggestedEntity: []
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  SET_FAILURE (state, error) {
    state.error = error
  },
  SET_COUNTRIES1 (state, countries) {
    state.countries1 = countries
  },
  SET_COUNTRIES2 (state, countries) {
    state.countries2 = countries
  },
  SET_SCORE1 (state, score) {
    state.score1 = score
  },
  SET_SCORE2 (state, score) {
    state.score2 = score
  },
  SET_PROFILENAME (state, name) {
    state.profileName = name
  },
  SET_CLASSNAME (state, name) {
    state.className = name
  },
  SET_CLASS (state, classString) {
    state.class = JSON.parse(classString)
  },
  SET_ATTRIBUTES (state, attrString) {
    state.attributes = JSON.parse(attrString)
  },
  SET_FACETS (state, facetString) {
    state.facets = JSON.parse(facetString)
  },
  SET_PROFILES (state, profiles) {
    state.profiles = profiles
  },
  SET_SUGGESTION (state, suggestion) {
    state.suggestedEntity = suggestion
  },
  SET_FACET_OPTIONS (state, {facet, options}) {
    console.log('b commit ' + facet + ' ' + options)
    state.facetOptions[facet] = options
    console.log('after ' + state.facetOptions)
  }
}

export const actions = {
  FETCH_PROFILE_BY_ID ({commit, state}, id) {
    console.log('fetching2 ID: ' + id)
    return axios.get(process.env.API_ENDPOINT + '/profile/' + id)
      .then((response) => {
        commit('SET_CLASS', response.data.class)
        commit('SET_ATTRIBUTES', response.data.attributes)
        commit('SET_FACETS', response.data.facets)
        commit('SET_PROFILENAME', response.data.name)

        console.log('state')
        console.log(state.class)
        console.log(state.facets)
        state.facets.map((facet) => {
          var query = `
          SELECT DISTINCT ?facet ?facetLabel
              WHERE {
              ?entity wdt:P31 wd:${state.class.code}.
              ?entity wdt:${facet.code} ?facet.
              SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
              }
          `
          console.log(query)
          return axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
            .then((response) => {
              console.log(response.data)
              commit('SET_FACET_OPTIONS', { facet: facet.code, options: response.data.results.bindings })
              console.log(state.facetOptions)
            })
            .catch((error) => {
              console.log(error)
            })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  FETCH_PROFILE ({commit, state}) {
    console.log('fetching all profiles')
    return axios.get(process.env.API_ENDPOINT + '/profile')
      .then((response) => {
        commit('SET_PROFILES', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  CREATE_PROFILE ({commit, state}, newProfile) {
    return axios.post(process.env.API_ENDPOINT + '/profile/new', newProfile)
      .then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
  },
  FETCH_FACET_OPTIONS ({commit, state}, {classCode, facetCode}) {
    var query = `
    SELECT DISTINCT ?facet ?facetLabel
        WHERE {
        ?entity wdt:P31 ${classCode}.
        ?entity wdt:${facetCode} ?facet
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
         }
    `
    return axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  SUGGESTER ({commit, state}, { type, query }) {
    return axios.post(process.env.WIKIDATA_API_ENDPOINT + `?action=wbsearchentities&format=json&origin=*&type=${type}&search=${query}&language=en`)
      .then((response) => {
        commit('SET_SUGGESTION', response.data.search)
      }).catch((error) => {
        console.log(error)
      })
  }
}
