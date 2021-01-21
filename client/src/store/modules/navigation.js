// state
const state = () => ({
  theme: "light",
  country: "France",
  countries:null
});

// getters
const getters = {
  theme: (state) => state.theme,
  country: (state) => state.country
};

// actions
const actions = {
  updateTheme({ commit }, theme) {
    commit("theme", theme);
  },
  updateCountry({ commit }, country) {
    commit("country", country);
  }
};

// mutations
const mutations = {
  theme(state, payload) {
    state.theme = payload;
  },
  country(state, payload) {
    state.country = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
