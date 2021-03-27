import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import Dashboard from "../../pages/Dashboard.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import getters from "../../store/modules/dashboard";
import actions from "../../store/modules/dashboard";

let testGetters = getters.getters;
let testActions = actions.actions;
let dataChart = ["testDataChart"];
let country = "Sweden";
const state = { dataChart, country };

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
  let store = {};
  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state,
      getters,
      actions,
    });
  });

  it("Find components", () => {
    const wrapper = shallowMount(Dashboard, {
      store,
      localVue,
      vuetify,
    });
    //summaryCountry
    const summaryCountry = wrapper.findComponent({ name: "SummaryCountry" });
    expect(summaryCountry.exists()).toBe(true);
    //chartSummaryCountry
    const chartSummaryCountry = wrapper.findComponent({
      name: "ChartSummaryCountry",
    });
    expect(chartSummaryCountry.exists()).toBe(true);
    //summaryGlobal
    const summaryGlobal = wrapper.findComponent({ name: "SummaryGlobal" });
    expect(summaryGlobal.exists()).toBe(true);
    //leafletMap
    const leafletMap = wrapper.findComponent({ name: "LeafletMap" });
    expect(leafletMap.exists()).toBe(true);
  });
  it("vuex/action => summaryCountry", async () => {
    const commit = jest.fn();
    const url = jest.fn();
    const body = jest.fn();
    await actions.summaryCountry({ commit }, { country });

    expect(url).toBe("/api/authenticate");
    expect(body).toEqual("Sweden");
    expect(commit).toHaveBeenCalledWith("SET_AUTHENTICATED", true);
  });
});
