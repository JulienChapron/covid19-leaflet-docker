<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Navigation />
    <Dashboard />
    <Footer />
  </v-app>
</template>

<script>
import Navigation from "@/layouts/Navigation";
import Footer from "@/layouts/Footer";
import Dashboard from "@/pages/Dashboard";

export default {
  components: {
    Navigation,
    Dashboard,
    Footer,
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>
