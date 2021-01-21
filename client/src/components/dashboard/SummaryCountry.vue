<template>
  <v-container fluid color="primary" class="overflow-y-auto">
    <h3>{{ new Date(summaryCountry.Date).toUTCString() }}</h3>
    <h2>{{ summaryCountry.Country }}</h2>
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
import { mapGetters } from "vuex";
export default {
  name: "SummaryCountry",
  data() {
    return {
      summaryCountry: {},
    };
  },
  watch: {
    country() {
      this.summaryCountryFunction();
    },
  },
  computed: {
    ...mapGetters(["country"]),
  },
  mounted() {
    this.summaryCountryFunction();
  },
  methods: {
    summaryCountryFunction() {
      axios.get("https://api.covid19api.com/summary").then(
        (response) =>
          (this.summaryGlobal = response.data.Countries.map((country) => {
            if (country.Country === this.country) this.summaryCountry = country;
          }))
      );
    },
  },
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
}
</style>
