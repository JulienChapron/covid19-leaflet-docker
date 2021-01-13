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
          primary: "#073b4c",
          secondary: "#118ab2",
          green: "#06d6a0",
          red: "#ef476f",
          yellow: "#ffd166",
          textcolor: "#f4f1de",
          background: "#073b4c",
        },
        dark:{
          primary: "#f4f1de",
          secondary: "#e07a5f",
          green: "#81b29a",
          red: "#3d405b",
          yellow: "#f2cc8f",
          textcolor: "#073b4c",
          background: "#f4f1de",
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
