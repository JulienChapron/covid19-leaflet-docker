import Vue from "vue";
import Vuetify from "vuetify";
import Dashboard from "../../pages/Dashboard.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("Dashboard.vue", () => {
  const localVue = createLocalVue();

  let vuetify;
  const vuetifyOptions = {};
  Vue.use(Vuetify);
  new Vue({
    vuetify: new Vuetify(vuetifyOptions),
  });
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should have a v-container", () => {
    const wrapper = shallowMount(Dashboard, {
      localVue,
      vuetify,
    });
    const summaryCountry = wrapper.findComponent({ name: "SummaryCountry" }); // => finds Bar by `name`
    expect(summaryCountry.exists()).toBe(true);
    const chartSummaryCountry = wrapper.findComponent({
      name: "ChartSummaryCountry",
    }); // => finds Bar by `name`
    expect(chartSummaryCountry.exists()).toBe(true);
    const summaryGlobal = wrapper.findComponent({ name: "SummaryGlobal" }); // => finds Bar by `name`
    expect(summaryGlobal.exists()).toBe(true);
    const leafletMap = wrapper.findComponent({ name: "LeafletMap" }); // => finds Bar by `name`
    expect(leafletMap.exists()).toBe(true);
  });
});
