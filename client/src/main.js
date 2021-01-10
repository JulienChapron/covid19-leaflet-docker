import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import App from '@/components/App.vue';
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false;

import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
} from 'vue2-leaflet';
import store from './store';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);

Vue.use(VueAnalytics, {
  id: 'UA-175195068-2'
})

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
