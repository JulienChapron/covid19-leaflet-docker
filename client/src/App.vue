<template>
  <v-app class="my-app" :style="{background: $vuetify.theme.themes[theme].primary}">
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
<style>
.my-app.v-application .primary--text {
    color: grey !important;
}
</style>