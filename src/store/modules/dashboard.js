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
  loadingSummaryWorld: true,
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
  SET_SUMMARY_GLOBAL(state, response) {
    state.summaryGlobal = response.data.Global;
  },
  SET_DATE_SUMMARY_GLOBAL(state, response) {
    state.dateSummaryGlobal = response.data.Date;
  },
  SET_DATA_CHART(state, response) {
    state.dataChart = response.data;
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
  SET_SUMMARY_COUNTRY(state, response) {
    response.data.Countries.map((country) => {
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
  async summaryGlobal({ commit }) {
    const response = await axios.get(process.env.VUE_APP_API_SUMMARY);
    commit("SET_SUMMARY_GLOBAL", response);
    commit("SET_DATE_SUMMARY_GLOBAL", response);
    commit("SET_LOADING_SUMMARY_WORLD", false);
  },
  async summaryCountry({ commit }) {
    commit("SET_LOADING_SUMMARY", true);
    const response = await axios.get(process.env.VUE_APP_API_SUMMARY);
    commit("SET_SUMMARY_COUNTRY", response);
    commit("SET_LOADING_SUMMARY", false);
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
  async updateOptionsChart({ commit }) {
    commit("SET_ERROR_DATA", false);
    const response = await axios.get(
      process.env.VUE_APP_API_TOTAL_COUNTRY +
        state.country +
        "?from=2020-03-01T00:00:00Z&e=" +
        state.currentDate.toJSON()
    );
    commit("SET_LOADING_MAP", false);
    if (response) {
      commit("SET_DATA_CHART", response);
    } else {
      commit("SET_ERROR_DATA", true);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
