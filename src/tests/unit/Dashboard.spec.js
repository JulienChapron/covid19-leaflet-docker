import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import getters from "../../store/modules/dashboard";
import actions from "../../store/modules/dashboard";
import mutations from "../../store/modules/dashboard";
import { Theme } from '../../plugins/vuetify'

let testGetters = getters.getters;
let testActions = actions.actions;
let testMutations = mutations.mutations;
let dataChart = ["testDataChart"];
let country = "France";
let countries = [];
let currentDate = new Date();
const state = { dataChart, country, countries, currentDate };

let url = "";

jest.mock("axios", () => ({
  get: (_url) => {
    return new Promise((resolve) => {
      url = _url;
      resolve(true);
    });
  },
}));

describe("Dashboard.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify;
  const vuetifyOptions = {};
  Vue.use(Vuetify);
  new Vue({
    vuetify: new Vuetify(vuetifyOptions),
  });
  let getters = testGetters;
  let actions = testActions;
  let mutations = testMutations;
  let store = {};
  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state,
      getters,
      actions,
      mutations,
    });
  });
  it("mutations = SET_LOADING_SUMMARY", () => {
    const loadingSummary = true;
    const state = {
      loadingSummary: false,
    };
    mutations.SET_LOADING_SUMMARY(state, loadingSummary);
    expect(state).toEqual({
      loadingSummary: true,
    });
  });
  it("mutations = SET_SUMMARY_COUNTRY", () => {
    const response = {
      data: { Countries: [{ Country: "Sweden" }, { Country: "Spain" }] },
    };
    const state = {
      country: "Sweden",
      summaryCountry: [],
    };
    mutations.SET_SUMMARY_COUNTRY(state, response);
    expect(state).toEqual({
      country: "Sweden",
      summaryCountry: { Country: "Sweden" },
    });
  });
  it("actions: summaryCountry", async () => {
    const commit = jest.fn();
    await actions.summaryCountry({ commit });
    expect(url).toBe(process.env.VUE_APP_API_SUMMARY);
    expect(commit).toHaveBeenCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_LOADING_SUMMARY', true);
    expect(commit).toHaveBeenNthCalledWith(2, 'SET_SUMMARY_COUNTRY', true);
    expect(commit).toHaveBeenNthCalledWith(3, 'SET_LOADING_SUMMARY', false);
  });
  it("actions: summaryGlobal", async () => {
    const commit = jest.fn();
    await actions.summaryGlobal({ commit });
    expect(url).toBe(process.env.VUE_APP_API_SUMMARY);
    expect(commit).toHaveBeenCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_SUMMARY_GLOBAL', true);
    expect(commit).toHaveBeenNthCalledWith(2, 'SET_DATE_SUMMARY_GLOBAL', true);
    expect(commit).toHaveBeenNthCalledWith(3, 'SET_LOADING_SUMMARY_WORLD', false);
  });
  it("actions: updateOptionsChart", async () => {
    const commit = jest.fn();
    await actions.updateOptionsChart({ commit });
    expect(url.slice(0, -3)).toBe(process.env.VUE_APP_API_TOTAL_COUNTRY+state.country+'?from=2020-03-01T00:00:00Z&e='+state.currentDate.toJSON().slice(0, -3));
    expect(commit).toHaveBeenCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_ERROR_DATA', false);
    expect(commit).toHaveBeenNthCalledWith(2, 'SET_LOADING_MAP', false);
    expect(commit).toHaveBeenNthCalledWith(3, 'SET_DATA_CHART', true);
  });
});
