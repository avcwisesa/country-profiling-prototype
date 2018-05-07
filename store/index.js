export const strict = false
export const state = () => ({
  countries1: [],
  countries2: [],
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
  SET_COUNTRIES1 (state, countries) {
    state.countries1 = countries
  },
  SET_COUNTRIES2 (state, countries) {
    state.countries2 = countries
  }
}

export const actions = {
}
