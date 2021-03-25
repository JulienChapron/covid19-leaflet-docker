<template>
  <v-container fluid>
    <v-row class="row-dashboard">
      <v-col cols="12" xs="12" sm="12" md="12" lg="4">
        <v-card color="secondary" elevation="4">
          <SummaryGlobal class="card-dashboard" />
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="8">
        <v-card color="secondary" elevation="4">
          <ChartSummaryCountry class="card-dashboard" />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="row-dashboard">
      <v-col cols="12" xs="12" sm="12" md="12" lg="4">
        <v-card color="secondary" elevation="4">
          <SummaryCountry class="card-dashboard" />
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="8">
        <v-card color="secondary" elevation="4">
          <LeafletMap class="card-leaflet" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LeafletMap from "@/components/map/LeafletMap";
import SummaryGlobal from "@/components/dashboard/SummaryGlobal";
import SummaryCountry from "@/components/dashboard/SummaryCountry";
import ChartSummaryCountry from "@/components/dashboard/ChartSummaryCountry";
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
    };
  },
  components: {
    LeafletMap,
    SummaryGlobal,
    SummaryCountry,
    ChartSummaryCountry,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
<style scoped>
@media (min-width: 1025px) {
  .card-dashboard {
    width: auto !important;
    height: 41vh !important;
  }
  .card-leaflet {
    width: auto !important;
    height: 41vh !important;
    margin-bottom: 0px !important;
  }
  .row-dashboard {
    padding: 5px;
  }
}
@media (max-width: 1024px) {
  .card-dashboard {
    width: auto !important;
    height: auto !important;
  }
  .card-leaflet {
    width: auto !important;
    height: 60vh !important;
    margin-bottom: 40px !important;
  }
  .row-dashboard {
    padding: 0px;
  }
}
</style>
