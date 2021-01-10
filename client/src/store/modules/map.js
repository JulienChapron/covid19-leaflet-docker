import axios from 'axios';
import alpha3_countries from '../../assets/json/alpha3_countries.json';
// state
const state = () => ({
  dataCountry: [],
  markersCountries: [],
  activeNavigationDrawers: false,
  allDataCountry: [],
  loadingDataCountry: true,
  loadingNewsCountry: true,
  newsBottomNav: false,
  databaseBottomNav: true,
  newsCountry: [],
  countryName: ""
});

// getters
const getters = {
  activeNavigationDrawers: (state) => state.activeNavigationDrawers,
  markersCountries: (state) => state.markersCountries,
  dataCountry: (state) => state.dataCountry,
  allDataCountry: (state) => state.allDataCountry,
  loadingDataCountry: (state) => state.loadingDataCountry,
  loadingNewsCountry: (state) => state.loadingNewsCountry,
  newsBottomNav: (state) => state.newsBottomNav,
  databaseBottomNav: (state) => state.databaseBottomNav,
  newsCountry: (state) => state.newsCountry,
  countryName: (state) => state.countryName
};

// actions
const actions = {
  activeNavigationDrawers({
    commit,
  }, payload) {
    commit('activeNavigationDrawers', payload);
  },
  // return news from country about covid19
  getLastNewsCountry({
    commit,
  }, name_alpha) {
    commit('loadingNewsCountry', true);
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API}/news-country/${name_alpha}`).then((response) => {
        resolve(response);
        setTimeout(() => {
          commit('loadingNewsCountry', false);
        }, 400);
        commit('newsCountry', response.data);
      }, (error) => {
        reject(error);
      });
    });
  },
  // return deaths and recovered by country on daily
  getDailyDataCountry({
    commit,
  }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API}/data-countries`).then((response) => {
        resolve(response);
        commit('dataMarkersCountries', response.data);
      }, (error) => {
        reject(error);
      });
    });
  },
  // data of all countries
  getDataMarkersCountries({
    commit,
  }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API}/data-countries`).then((response) => {
        resolve(response);
        commit('dataMarkersCountries', response.data);
      }, (error) => {
        reject(error);
      });
    });
  },
  // click on marker, return data country
  getDataCountry({
    commit,
  }, dataCountry) {
    commit('loadingDataCountry', true);
    commit('countryName', dataCountry[0])

    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API}/data-country/${dataCountry[0]}/${dataCountry[2]}/${dataCountry[1]}`).then((response) => {
        resolve(response);
        setTimeout(() => {
          commit('loadingDataCountry', false);
        }, 400);
        commit('dataCountry', response.data);
      }, (error) => {
        reject(error);
      });
    });
  },
  // return all datas countries
  getAllDataCountry({
    commit,
  }, name) {
    return new Promise((resolve, reject) => {
      axios.get(`https://restcountries.eu/rest/v2/name/${name}`).then((response) => {
        resolve(response);
        commit('AllDataCountry', response.data);
      }, (error) => {
        reject(error);
      });
    });
  },
};

// mutations
const mutations = {
  databaseBottomNav(state, payload) {
    state.databaseBottomNav = payload;
  },
  countryName(state, payload) {
    state.countryName = payload
  },
  newsBottomNav(state, payload) {
    state.newsBottomNav = payload;
  },
  loadingDataCountry(state, payload) {
    state.loadingDataCountry = payload;
  },
  loadingNewsCountry(state, payload) {
    state.loadingNewsCountry = payload;
  },
  activeNavigationDrawers(state, payload) {
    state.activeNavigationDrawers = payload;
  },
  dataMarkersCountries(state, payload) {
    state.markersCountries = payload;
  },
  dataCountry(state, payload) {
    state.dataCountry = payload;
  },
  newsCountry(state, payload) {
    state.newsCountry = payload;
  },
  AllDataCountry(state, payload) {
    // refactor code alpha 3 in 'borders'
    if (payload[0].borders.length) {
      let newBorders = '';
      payload[0].borders.forEach((element) => {
        let newBorder = '';
        newBorder = alpha3_countries.filter((x) => x['alpha-3'] === element);
        newBorder = newBorder[0].name;
        newBorders += `, ${newBorder}`;
      });
      newBorders = newBorders.substring(1);
      payload[0].borders = newBorders;
    }
    state.allDataCountry = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};