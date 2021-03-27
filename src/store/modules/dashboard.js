import axios from "axios";
const state = {
  summaryGlobal: {},
  dateSummaryGlobal: "",
  summaryCountry: {},
  country: "France",
  countries: [],
  countryLatLng: {},
  currentDate: new Date(),
  dataChart: [],
  errorData: false,
  loadingSummary: false,
  loadingMap: true,
  loadingChart: false,
  loadingSummaryWorld:true
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
  getCountryLatLng: (state) => {
    return state.countryLatLng;
  },
  getCurrentData: (state) => {
    return state.currentData;
  },
  getDataChart: (state) => {
    return state.dataChart;
  },
  getErrorData: (state) => {
    return state.errorData;
  },
  getLoadingSummary: (state) => {
    return state.loadingSummary;
  },
  getLoadingMap: (state) => {
    return state.loadingMap;
  },
  getLoadingChart: (state) => {
    return state.loadingChart;
  },
  getLoadingSummaryWorld: (state) => {
    return state.loadingSummaryWorld;
  },
};
const mutations = {
  SET_COUNTRY(state, country) {
    state.country = country;
  },
  SET_COUNTRY_LAT_LNG(state, countryLatLng) {
    state.countryLatLng = countryLatLng;
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
  SET_DATA_CHART(state, dataChart) {
    state.dataChart = dataChart;
  },
  SET_ERROR_DATA(state, errorData) {
    state.errorData = errorData;
  },
  SET_LOADING_SUMMARY(state, loadingSummary) {
    state.loadingSummary = loadingSummary;
  },
  SET_LOADING_MAP(state, loadingMap) {
    state.loadingMap = loadingMap;
  },
  SET_LOADING_SUMMARY_WORLD(state, loadingSummaryWorld) {
    state.loadingSummaryWorld = loadingSummaryWorld;
  },
  SET_LOADING_CHART(state, loadingChart) {
    state.loadingChart = loadingChart;
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
          commit("SET_LOADING_SUMMARY_WORLD", false);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
  summaryCountry({ commit }) {
    commit("SET_LOADING_SUMMARY", true);
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_SUMMARY)
        .then(({ data }) => {
          commit("SET_SUMMARY_COUNTRY", data.Countries);
          commit("SET_LOADING_SUMMARY", false);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
  countryLongitudeLatitude({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_API_DAYONE + state.country)
        .then(({ data }) => {
          commit("SET_COUNTRY_LAT_LNG", data[0]);
          commit("SET_ERROR_DATA", false);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
  updateOptionsChart({ commit }) {
    commit("SET_ERROR_DATA", false);
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.VUE_APP_API_TOTAL_COUNTRY +
            state.country +
            "?from=2020-03-01T00:00:00Z&to=" +
            state.currentDate.toJSON()
        )
        .then(({ data }) => {
          commit("SET_LOADING_MAP", false);
          if (data.length) {
            commit("SET_DATA_CHART", data);
          } else {
            commit("SET_ERROR_DATA", true);
          }
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
