import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import axios from "axios";
import SummaryCountry from "@/components/dashboard/SummaryCountry.vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import getters from "../../store/modules/dashboard";

let testGetters = getters.getters;
const country = "Sweden";
const summaryCountry = {date:"12/04/2021"}
const state = { country,summaryCountry };

let API = "https://api.covid19api.com/summary";

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
  let store = {};
  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state,
      getters
    });
  });

  it("balise", () => {
    const wrapper = mount(SummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.find("p").exists()).toBe(true);
  });
  it("country", () => {
    const wrapper = mount(SummaryCountry, {
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
    const actual = getters.getCountry(state);
    expect(actual).toEqual("Sweden");
  });
  it("should return 190 countries", async () => {
    const response = await axios.get(API);
    const { Countries } = response.data;
    expect(Countries.length).toBe(190);
  });
  it("should return success response", async () => {
    jest.mock("axios");
    const axios = require("axios");
    const mockResponse = { data: { msg: "Hello World" } };
    axios.get.mockImplementation(() => Promise.resolve(mockResponse));
    const res = await axios.get(API);
    expect(res.data).toMatchObject({ msg: "Hello World" });
  });
});
