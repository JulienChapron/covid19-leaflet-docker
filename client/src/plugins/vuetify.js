// src/plugins/vuetify.js
import Vue from "vue";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
const opts = {};

export default new Vuetify(
  {
    theme: {
      themes: {
        light: {
          primary: "#011627",
          secondary: "#fdfffc",
          green: "#2ec4b6",
          red: "#e71d36",
          yellow: "#ff9f1c"
        },
        dark:{
          secondary: "#011627",
          primary: "#fdfffc",
        }
      },
    },
  },
  opts,
  {
    icons: {
      iconfont: "fa",
    },
  },
  {
    icons: {
      iconfont: "mdi", // default - only for display purposes
    },
  }
);
