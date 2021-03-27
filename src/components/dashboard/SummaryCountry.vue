<template>
  <v-container fluid color="primary" class="overflow-y-auto">
    <div>
      <h3 class="date">{{ new Date(getSummaryCountry.Date).toUTCString() }}</h3>
      <h2 class="country">{{ getSummaryCountry.Country }}</h2>
      <p class="new-confirmed">
        New confirmed: {{ getSummaryCountry.NewConfirmed }}
      </p>
      <p class="total-confirmed">
        Total confirmed: {{ getSummaryCountry.TotalConfirmed }}
      </p>
      <p class="new-deaths">New deaths: {{ getSummaryCountry.NewDeaths }}</p>
      <p class="total-deaths">
        Total deaths: {{ getSummaryCountry.TotalDeaths }}
      </p>
      <p class="new-recovered">
        New recovered: {{ getSummaryCountry.NewRecovered }}
      </p>
      <p class="total-recovered">
        Total recovered: {{ getSummaryCountry.TotalRecovered }}
      </p>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SummaryCountry",
  watch: {
    getCountry() {
      this.$store.dispatch("summaryCountry");
    },
  },
  computed: {
    ...mapGetters(["getCountry", "getSummaryCountry"]),
  },
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
}
</style>
