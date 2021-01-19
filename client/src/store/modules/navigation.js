// state
const state = () => ({
  theme: "light",
});

// getters
const getters = {
  theme: (state) => state.theme,
};

// actions
const actions = {
  updateTheme({ commit }, theme) {
    commit("theme", theme);
  },
};

// mutations
const mutations = {
  theme(state, payload) {
    state.theme = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
