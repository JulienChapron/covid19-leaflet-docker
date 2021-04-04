import Vue from "vue";
import Vuetify from "vuetify";
import Footer from "../../layouts/Footer.vue";
import { createLocalVue, mount } from "@vue/test-utils";

describe("Dashboard.vue", () => {
  const localVue = createLocalVue()
  let vuetify;
  Vue.use(Vuetify);
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it("Find component", () => {
    const wrapper = mount(Footer, {
      localVue,
      vuetify,
    });
    const footer = wrapper.findComponent({ name: "Footer" });
    expect(footer.exists()).toBe(true);
  });
  it("Find v-footer and version", () => {
    const wrapper = mount(Footer, {
      localVue,
      vuetify,
    });
    const footer = wrapper.find('.v-footer')
    expect(footer.text()).toBe(process.env.VUE_APP_VERSION)
  });
});
