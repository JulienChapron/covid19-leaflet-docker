import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import ChartSummaryCountry from "../../components/dashboard/ChartSummaryCountry.vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
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
const state = { dataChart, country, countries, currentDate }
const sixMonth = "6month"
describe("ChartSummaryCountry.vue", () => {
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
    const wrapper = shallowMount(ChartSummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    const summaryCountry = wrapper.findComponent({ name: "ChartSummaryCountry" });
    expect(summaryCountry.exists()).toBe(true);

  });
  it("getters: getCountry", () => {
    const actual = getters.getCountry(state)
    expect(actual).toEqual(country)
  })
  it("getters: getDataChart", () => {
    const actual = getters.getDataChart(state)
    expect(actual).toEqual(['testDataChart'])
  })
  it("renders button: 6 month", async () => {
    const wrapper = mount(ChartSummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.find("#one_week").text()).toBe("1W")
    expect(wrapper.find("#one_week").text()).toBe("1W")
    expect(wrapper.find("#one_month").text()).toBe("1M")
    expect(wrapper.find("#one_month").text()).toBe("1M")
    expect(wrapper.find("#six_months").text()).toBe("6M")
    expect(wrapper.find("#six_months").text()).toBe("6M")
    expect(wrapper.find("#one_year").text()).toBe("1Y")
    expect(wrapper.find("#one_year").text()).toBe("1Y")
  })
});

