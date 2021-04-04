<template>
  <v-container fluid color="primary" class="overflow-y-auto">
    <h3>{{ new Date(getDateSummaryGlobal).toUTCString() }}</h3>
    <h2>World</h2>
    <p>New confirmed: {{ getSummaryGlobal.NewConfirmed }}</p>
    <p>Total confirmed: {{ getSummaryGlobal.TotalConfirmed }}</p>
    <p>New deaths: {{ getSummaryGlobal.NewDeaths }}</p>
    <p>Total deaths: {{ getSummaryGlobal.TotalDeaths }}</p>
    <p>New recovered: {{ getSummaryGlobal.NewRecovered }}</p>
    <p>Total recovered: {{ getSummaryGlobal.TotalRecovered }}</p>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SummaryGlobal",
  computed: {
    ...mapGetters(["getSummaryGlobal", "getDateSummaryGlobal"]),
  },
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
}
</style>
