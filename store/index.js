import axios from 'axios'

export const strict = false
export const state = () => ({
  alertValue: false,
  alertMessage: 'alert',
  class: {},
  classElements: [],
  facets: [],
  facetOptions: {},
  attributes: [],
  score1: 0,
  score2: 0,
  subclass: false,
  countries1: [],
  countries2: [],
  properties: [1, 2, 3, 4, 5, 6],
  error: null,
  profileName: '',
  profileClass: '',
  profiles: [],
  suggestedEntity: [],
  jumbotron: false,
  languages: []
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
    state.facetOptions[facet] = options
  },
  SET_SUBCLASS (state, subclass) {
    state.subclass = subclass
  },
  SET_ALERT_VALUE (state, value) {
    state.alertValue = value
  },
  SET_ALERT_MESSAGE (state, message) {
    state.alertMessage = message
  },
  SET_JUMBOTRON_VALUE (state, value) {
    state.jumbotron = value
  },
  SET_LANGUAGES (state, languages) {
    state.languages = languages
  }
}

export const actions = {
  FETCH_PROFILE_BY_ID ({commit}, id) {
    console.log('fetching2 ID: ' + id)
    return axios.get(process.env.API_ENDPOINT + '/profile/' + id)
      .then((response) => {
        commit('SET_CLASS', response.data.class)
        commit('SET_ATTRIBUTES', response.data.attributes)
        commit('SET_FACETS', response.data.facets)
        commit('SET_PROFILENAME', response.data.name)
        commit('SET_SUBCLASS', response.data.subclass)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  FETCH_PROFILE ({commit}) {
    console.log('fetching all profiles')
    return axios.get(process.env.API_ENDPOINT + '/profile')
      .then((response) => {
        commit('SET_PROFILES', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  CREATE_PROFILE ({commit}, newProfile) {
    return axios.post(process.env.API_ENDPOINT + '/profile/new', newProfile)
      .then((response) => {
        console.log(newProfile)
        commit('SET_ALERT_VALUE', true)
        commit('SET_ALERT_MESSAGE', `Profile successfully created`)
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
  },
  UPDATE_PROFILE ({commit}, newProfile) {
    return axios.put(process.env.API_ENDPOINT + '/profile/update', newProfile)
      .then((response) => {
        console.log(newProfile)
        commit('SET_ALERT_VALUE', true)
        commit('SET_ALERT_MESSAGE', `Profile successfully updated`)
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
  },
  FETCH_FACET_OPTIONS ({commit, state}) {
    var responsePromise = state.facets.map(async (facet) => {
      var query = `
      SELECT DISTINCT ?facet ?facetLabel ?${facet.code}
          WHERE {
          ?entity wdt:P31 wd:${state.class.code}.
          ?entity wdt:${facet.code} ?facet.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          }
      `
      return axios.post(process.env.WIKIDATA_SPARQL_ENDPOINT + 'sparql?query=' + encodeURIComponent(query))
    })
    console.log(responsePromise)

    Promise.all(responsePromise).then((completed) => {
      completed.map((response) => {
        // console.log(response.data)
        commit('SET_FACET_OPTIONS', { facet: response.data.head.vars[2], options: response.data.results.bindings })
      })
    })
  },
  SUGGESTER ({commit}, { type, query }) {
    return axios.post(process.env.WIKIDATA_API_ENDPOINT + `?action=wbsearchentities&format=json&origin=*&type=${type}&search=${query}&language=en`)
      .then((response) => {
        commit('SET_SUGGESTION', response.data.search)
      }).catch((error) => {
        console.log(error)
      })
  },
  LANGUAGES ({commit}) {
    return axios.get(process.env.WIKIDATA_API_ENDPOINT + `?action=query&format=json&origin=*&meta=siteinfo&siprop=languages`)
      .then((response) => {
        console.log(response.data.query.languages)
        commit('SET_LANGUAGES', response.data.query.languages)
      }).catch((error) => {
        console.log(error)
      })
  },
  DELETE_PROFILE ({commit}, { name, id }) {
    console.log('deleting: ' + id)
    return axios.delete(process.env.API_ENDPOINT + '/profile/' + id)
      .then((response) => {
        commit('SET_ALERT_VALUE', true)
        commit('SET_ALERT_MESSAGE', `Profile '${name}' successfully deleted`)
      })
      .catch((error) => {
        commit('SET_ALERT_VALUE', true)
        commit('SET_ALERT_MESSAGE', `Failure in deleting profile '${name}'`)
        console.log(error)
      })
  }
}
