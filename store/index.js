export const strict = false
export const state = () => ({
  class: { name: 'Country', code: 'Q6256' },
  classElements: [],
  facets: [{ name: 'continent', code: 'P30' }, { name: 'member of', code: 'P463' }],
  attributes: [
    { name: 'head of govt', code: 'P6' },
    { name: 'capital', code: 'P36' },
    { name: 'currency', code: 'P38' },
    { name: 'official language', code: 'P37' },
    { name: 'inception', code: 'P571' },
    { name: 'central bank', code: 'P1304' }
  ],
  score1: 0,
  score2: 0,
  countries1: [],
  countries2: [],
  properties: [1, 2, 3, 4, 5, 6],
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
  },
  SET_SCORE1 (state, score) {
    state.score1 = score
  },
  SET_SCORE2 (state, score) {
    state.score2 = score
  }
}

export const actions = {
}
