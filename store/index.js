import axios from 'axios'

export const strict = false
export const state = () => ({
  class: {},
  classElements: [],
  facets: [],
  attributes: [],
  score1: 0,
  score2: 0,
  countries1: [],
  countries2: [],
  properties: [1, 2, 3, 4, 5, 6],
  error: null,
  profileName: '',
  profileClass: '',
  profiles: []
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
    state.class = JSON.parse(classString.replace(/name/g, '"name"').replace(/code/g, '"code"').replace(/'/g, '"'))
  },
  SET_ATTRIBUTES (state, attrString) {
    state.attributes = JSON.parse(attrString.replace(/name/g, '"name"').replace(/code/g, '"code"').replace(/'/g, '"'))
  },
  SET_FACETS (state, facetString) {
    state.facets = JSON.parse(facetString.replace(/name/g, '"name"').replace(/code/g, '"code"').replace(/'/g, '"'))
  },
  SET_PROFILES (state, profiles) {
    state.profiles = profiles
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
  }
}
