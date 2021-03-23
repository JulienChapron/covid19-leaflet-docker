import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import SummaryCountry from "@/components/dashboard/SummaryCountry.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import getters from "../../store/modules/navigation";

let testGetters = getters.getters;
const country = "Sweden";
const state = { country };

describe("SummaryCountry.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify;
  const vuetifyOptions = {};
  Vue.use(Vuetify);
  new Vue({
    vuetify: new Vuetify(vuetifyOptions),
  });
  let getters = testGetters;
  let store;
  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      getters,
    });
  });

  it("balise", () => {
    const wrapper = shallowMount(SummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.find("p").exists()).toBe(true);
  });
  it("country", () => {
    const wrapper = shallowMount(SummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(
      wrapper
        .find(".country")
        .find("h2")
        .exists()
    ).toBe(true);
    const actual = getters.country(state);
    expect(actual).toEqual("Sweden");
  });
});
