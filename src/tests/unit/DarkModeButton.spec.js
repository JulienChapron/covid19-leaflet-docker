import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import DarkModeButton from "../../components/navigation/DarkModeButton.vue";
import { createLocalVue, mount } from "@vue/test-utils";

describe("DarkModeButton.vue", () => {
  const localVue = createLocalVue()
  let vuetify;
  let wrapper;
  Vue.use(Vuetify);
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  afterEach(() => {
    wrapper.destroy()
  })
  it("1.Find component", () => {
      wrapper = mount(DarkModeButton, {
      localVue,
      vuetify
    });
    expect(wrapper.findComponent({ name: "DarkModeButton" }).exists()).toBe(true);
  });
  it("2.Theme light by default", () => {
    wrapper = mount(DarkModeButton, {
      localVue,
      vuetify,
    });
    expect(wrapper.find('.mdi-moon-waxing-crescent').exists()).toBe(true)
  });
  it("3.Tootlip Dark Mode On", async (done) => {
    const localVue = createLocalVue();
    localVue.use(Vuex); 
    wrapper = mount(DarkModeButton, {
      localVue,
      vuetify
    }); 
    const vIcon = wrapper.find('.v-icon')
    vIcon.trigger('mouseenter');
    await wrapper.vm.$nextTick()
    requestAnimationFrame(() => {
      expect(wrapper.find('span').text()).toBe('Dark Mode On')
      done()
    })
  });
});