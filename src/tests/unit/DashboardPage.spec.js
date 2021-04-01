import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import Dashboard from "../../pages/Dashboard.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import getters from "../../store/modules/dashboard";
import actions from "../../store/modules/dashboard";
import mutations from "../../store/modules/dashboard";
let testGetters = getters.getters;
let testActions = actions.actions;
let testMutations = mutations.mutations;
let dataChart = ["testDataChart"];
let country = "France";
let countries = [];
let currentDate = new Date();
const state = { dataChart, country, countries, currentDate };

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
  it("Find components", () => {
    const wrapper = shallowMount(Dashboard, {
      store,
      localVue,
      vuetify,
    });
    const summaryCountry = wrapper.findComponent({ name: "SummaryCountry" });
    expect(summaryCountry.exists()).toBe(true);
    const chartSummaryCountry = wrapper.findComponent({
      name: "ChartSummaryCountry",
    });
    expect(chartSummaryCountry.exists()).toBe(true);
    const summaryGlobal = wrapper.findComponent({ name: "SummaryGlobal" });
    expect(summaryGlobal.exists()).toBe(true);
    const leafletMap = wrapper.findComponent({ name: "LeafletMap" });
    expect(leafletMap.exists()).toBe(true);
  });
});
