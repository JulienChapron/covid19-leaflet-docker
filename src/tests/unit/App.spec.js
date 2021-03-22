import Vue from "vue";
import Vuetify from "vuetify";
import App from "../../App";
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("App.vue", () => {
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

  it("should have a v-app", () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".v-app"));
  });
});
