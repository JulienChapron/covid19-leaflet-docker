<template>
  <v-container fluid>
    <v-row class="row-dashboard">
      <v-col cols="12" xs="12" sm="12" md="12" lg="4">
        <v-card color="secondary" elevation="4">
          <SkeletonsSummary
            v-if="getLoadingSummaryWorld"
            class="card-dashboard"
          />
          <SummaryGlobal v-else class="card-dashboard" />
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="8">
        <v-card color="secondary" elevation="4">
          <SkeletonsChart
            v-if="!getErrorData && !getDataChart.length"
            class="card-dashboard"
          />
          <ChartSummaryCountry
            v-if="!getErrorData && getDataChart.length"
            class="card-dashboard"
          />
          <NotificationNoData class="card-dashboard" v-if="getErrorData" />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="row-dashboard">
      <v-col cols="12" xs="12" sm="12" md="12" lg="4">
        <v-card color="secondary" elevation="4">
          <SkeletonsSummary
            v-if="!getErrorData && getLoadingSummary"
            class="card-dashboard"
          />
          <SummaryCountry
            v-if="!getErrorData && !getLoadingSummary"
            class="card-dashboard"
          />
          <NotificationNoData class="card-dashboard" v-if="getErrorData" />
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="8">
        <v-card color="secondary" elevation="4">
          <SkeletonsMap v-if="getLoadingMap" class="card-dashboard" />
          <LeafletMap class="card-leaflet" v-else />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import LeafletMap from "@/components/map/LeafletMap";
import SummaryGlobal from "@/components/dashboard/SummaryGlobal";
import SummaryCountry from "@/components/dashboard/SummaryCountry";
import ChartSummaryCountry from "@/components/dashboard/ChartSummaryCountry";
import SkeletonsSummary from "@/components/dashboard/SkeletonsSummary";
import SkeletonsChart from "@/components/dashboard/SkeletonsChart";
import SkeletonsMap from "@/components/dashboard/SkeletonsMap";
import NotificationNoData from "@/components/dashboard/NotificationNoData";
export default {
  name: "Dashboard",
  components: {
    LeafletMap,
    SummaryGlobal,
    SummaryCountry,
    ChartSummaryCountry,
    NotificationNoData,
    SkeletonsSummary,
    SkeletonsChart,
    SkeletonsMap,
  },
  computed: {
    ...mapGetters([
      "getErrorData",
      "getLoadingSummary",
      "getLoadingMap",
      "getDataChart",
      "getLoadingSummaryWorld",
    ])
  },
  mounted() {
    this.$store.dispatch("summaryCountry");
    this.$store.dispatch("summaryGlobal");
    this.$store.dispatch("updateOptionsChart");
  },
};
</script>
<style scoped>
@media (min-width: 1025px) {
  .card-dashboard {
    width: auto !important;
    height: 40vh !important;
  }
  .card-leaflet {
    border-radius: 5px !important;
    width: auto !important;
    height: 40vh !important;
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
    border-radius: 5px !important;
    width: auto !important;
    height: 60vh !important;
    margin-bottom: 40px !important;
  }
  .row-dashboard {
    padding: 0px;
  }
}
</style>
