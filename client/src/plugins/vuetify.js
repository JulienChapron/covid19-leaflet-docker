// src/plugins/vuetify.js
import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
const opts = {};

export default new Vuetify(
  opts, {
    icons: {
      iconfont: 'fa',
    },
  }, {
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
  },
);
