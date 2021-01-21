// src/plugins/vuetify.js
import Vue from "vue";
import "@mdi/font/css/materialdesignicons.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
const opts = {};

export default new Vuetify(
  {
    theme: {
      themes: {
        dark: {
          primary: "#0b132b",
          secondary: "#1c2541",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          background:"#0b132b"
        },
        light: {
          primary: "#ffffff",
          secondary: "#ffffff",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          background:"#ffd6ba"
        },
      },
    },
  },
  opts,
  {
    icons: {
      iconfont: "mdi",
    },
  }
);
