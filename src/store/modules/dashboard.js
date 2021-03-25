import axios from "axios";
const state = {
  summaryGlobal: {},
  dateSummaryGlobal: "",
  summaryCountry: {},
  country: "France",
  countries: [],
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
  getCountries: (state) => {
    return state.countries;
  },
};
const mutations = {
  SET_COUNTRY(state, country) {
    state.country = country;
  },
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },
  SET_SUMMARY_GLOBAL(state, summaryGlobal) {
    state.summaryGlobal = summaryGlobal;
  },
  SET_DATE_SUMMARY_GLOBAL(state, dateSummaryGlobal) {
    state.dateSummaryGlobal = dateSummaryGlobal;
  },
  SET_SUMMARY_COUNTRY(state, summaryCountries) {
    summaryCountries.map((country) => {
      if (country.Country === state.country) {
        state.summaryCountry = country;
      }
    });
  },
};
const actions = {
  countries({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_COUNTRIES)
        .then(({ data }) => {
          commit("SET_COUNTRIES", data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
  country({ commit }, country) {
    commit("SET_COUNTRY", country);
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
