<template>
  <v-app>
    <Navigation />
    <Map v-if="markersCountries.length" />
    <div style="background-color:grey;height:91%" v-else>
      <div style="position:absolute;margin-top:20%; margin-left:48%;">
        <v-progress-circular :size="50" color="secondary" indeterminate />
        <p style="font-size:12px;">Loading...</p>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Navigation from "@/components/layouts/Navigation";
import Footer from "@/components/layouts/Footer";
import Map from "@/components/pages/Map";
import { mapGetters } from "vuex";

export default {
  components: {
    Navigation,
    Map,
    Footer,
  },
  computed: {
    ...mapGetters(["markersCountries"]),
  },
  created() {
    this.$store.dispatch("getDataMarkersCountries");
  },
  mounted() {
    this.$ga.enable();
  }
};
</script>
