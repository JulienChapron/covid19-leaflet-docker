<template>
  <v-container color="primary" class="overflow-y-auto">
    <h3>{{date}}</h3>
    <h2>World</h2>
    <p>New confirmed: {{ summaryGlobal.NewConfirmed }}</p>
    <p>Total confirmed: {{ summaryGlobal.TotalConfirmed }}</p>
    <p>New deaths: {{ summaryGlobal.NewDeaths }}</p>
    <p>Total deaths: {{ summaryGlobal.TotalDeaths }}</p>
    <p>New recovered: {{ summaryGlobal.NewRecovered }}</p>
    <p>Total recovered: {{ summaryGlobal.TotalRecovered }}</p>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "SummaryGlobal",
  data() {
    return {
      summaryGlobal: {},
      date: "",
    };
  },
  mounted() {
    axios
      .get("https://api.covid19api.com/summary")
      .then(
        (response) => (
          (this.summaryGlobal = response.data.Global),
          (this.date = response.data.Date)
        )
      );
  },
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
}
</style>
