import Vue from "vue";
import Vuetify from "vuetify";
import Navigation from "../../layouts/Navigation.vue";
import Autocomplete from "@/components/navigation/Autocomplete.vue";
import DarkModeButton from "@/components/navigation/DarkModeButton.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import getters from "../../store/modules/dashboard";
import actions from "../../store/modules/dashboard";
import Vuex from "vuex";

let testGetters = getters.getters;
let testActions = actions.actions;
let testState = {
  theme: "light"
}

describe("Dashboard.vue", () => {
  const localVue = createLocalVue();
  Vue.use(Vuetify);
  localVue.use(Vuex);
  let vuetify;
  const vuetifyOptions = {};
  Vue.use(Vuetify);
  new Vue({
    vuetify: new Vuetify(vuetifyOptions),
  });
  let getters = testGetters;
  let actions = testActions;
  let state = testState;

  let store = {};
  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      getters,
      actions,
      state
    });
  });
  it("1.Find component", () => {
    const wrapper = mount(Navigation, {
      store,
      localVue,
      vuetify,
    });
    const navigation = wrapper.findComponent({ name: "Navigation" });
    expect(navigation.exists()).toBe(true);
  });
  it("2.Renders a child Autocomplete component", () => {
    const wrapper = mount(Navigation, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.findComponent(Autocomplete).exists()).toBe(true)
  })

  it("3.Renders a child DarkModeButton component", () => {
    const wrapper = mount(DarkModeButton, {
      store,
      localVue,
      vuetify,
      data() {
        return { showChild: true }
      }
    });
    expect(wrapper.findComponent({ name: "DarkModeButton" }).exists()).toBe(true)
  })
});
