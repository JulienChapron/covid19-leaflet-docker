<template>
  <v-container fluid color="primary" class="overflow-y-auto">
    <h3 class="date">{{ new Date(summaryCountry.Date).toUTCString() }}</h3>
    <h2 class="country">{{ summaryCountry.Country }}</h2>
    <p class="new-confirmed">
      New confirmed: {{ summaryCountry.NewConfirmed }}
    </p>
    <p class="total-confirmed">
      Total confirmed: {{ summaryCountry.TotalConfirmed }}
    </p>
    <p class="new-deaths">New deaths: {{ summaryCountry.NewDeaths }}</p>
    <p class="total-deaths">Total deaths: {{ summaryCountry.TotalDeaths }}</p>
    <p class="new-recovered">
      New recovered: {{ summaryCountry.NewRecovered }}
    </p>
    <p class="total-recovered">
      Total recovered: {{ summaryCountry.TotalRecovered }}
    </p>
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
      axios.get("https://api.covid19api.com/summary").then((response) =>
        response.data.Countries.map((country) => {
          if (country.Country === this.country) this.summaryCountry = country;
        })
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
