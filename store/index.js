export const strict = false
export const state = () => ({
  countries: [],
  properties: [1, 2, 3, 4, 5],
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
  }
}

export const actions = {
  SET_CHART ({ commit }) {
    commit('SET_CHART_LABEL')
  }
}
