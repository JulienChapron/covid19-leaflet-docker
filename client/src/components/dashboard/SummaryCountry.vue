<template>
  <v-container fluid color="primary" class="overflow-y-auto">
    <h3>{{summaryCountry.Date}}</h3>
    <h2>{{summaryCountry.Country}}</h2>
    <p>New confirmed: {{ summaryCountry.NewConfirmed }}</p>
    <p>Total confirmed: {{ summaryCountry.TotalConfirmed }}</p>
    <p>New deaths: {{ summaryCountry.NewDeaths }}</p>
    <p>Total deaths: {{ summaryCountry.TotalDeaths }}</p>
    <p>New recovered: {{ summaryCountry.NewRecovered }}</p>
    <p>Total recovered: {{ summaryCountry.TotalRecovered }}</p>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "SummaryCountry",
  data() {
    return {
      summaryCountry: {},
    };
  },
  mounted() {
    axios.get("https://api.covid19api.com/summary").then(
      (response) =>
        (this.summaryGlobal = response.data.Countries.map((country) => {
          if (country.Country === "France") this.summaryCountry = country;
        }))
    );
  },
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
}
</style>
