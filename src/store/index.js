import Vue from 'vue';
import Vuex from 'vuex';
import map from './modules/map';
import navigation from './modules/navigation';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    map,
    navigation
  },
  strict: debug,
});
