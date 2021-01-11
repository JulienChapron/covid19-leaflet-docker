<template>
<div>
  <v-app style="background-color:#011627 !important">
    <Navigation />
    <Dashboard />
    <Footer />
  </v-app>
  </div>
</template>

<script>
import Navigation from "@/layouts/Navigation";
import Footer from "@/layouts/Footer";
import Dashboard from "@/pages/Dashboard";

export default {
  components: {
    Navigation,
    Dashboard,
    Footer
  },
};
</script>
