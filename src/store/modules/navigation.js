const state = () => ({
  theme: "light",
});
const getters = {
  theme: (state) => state.theme,
};
const actions = {
  updateTheme({ commit }, theme) {
    commit("theme", theme);
  },
};
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
