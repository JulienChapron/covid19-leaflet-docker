import axios from "axios";
const state = {
  summaryGlobal: {},
  dateSummaryGlobal: "",
  summaryCountry: {},
  country: "France",
};
const getters = {
  getSummaryGlobal: (state) => {
    return state.summaryGlobal;
  },
  getDateSummaryGlobal: (state) => {
    return state.dateSummaryGlobal;
  },
  getSummaryCountry: (state) => {
    return state.summaryCountry;
  },
  getCountry: (state) => {
    return state.country;
  },
};
const mutations = {
  SET_COUNTRY(state, country) {
    state.country = country;
  },
  SET_SUMMARY_GLOBAL(state, summaryGlobal) {
    state.summaryGlobal = summaryGlobal;
  },
  SET_DATE_SUMMARY_GLOBAL(state, dateSummaryGlobal) {
    state.dateSummaryGlobal = dateSummaryGlobal;
  },
  SET_SUMMARY_COUNTRY(state, summaryCountries) {
    summaryCountries.map((country) => {
      if (country.Country === this.country) {
        state.summaryCountry = country;
      }
    });
  },
};
const actions = {
  country({ commit }, country) {
    commit("getCountry", country);
  },
  summaryGlobal({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_SUMMARY)
        .then(({ data }) => {
          commit("SET_SUMMARY_GLOBAL", data.Global);
          commit("SET_DATE_SUMMARY_GLOBAL", data.Date);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
  summaryCountry({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_SUMMARY)
        .then(({ data }) => {
          commit("SET_SUMMARY_COUNTRY", data.Countries);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
