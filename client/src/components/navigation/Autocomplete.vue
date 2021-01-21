<template>
  <div>
    <v-autocomplete
      style="top:10px;"
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      hide-no-data
      clearable
      label="Choose your country"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "Autocomplete",
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      countries: [],
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
      this.updateCountry(this.select);
    }
  },
  mounted() {
    axios
      .get("https://api.covid19api.com/countries")
      .then((response) => (
        this.countries = response.data
      ));
  },
  methods: {
    ...mapActions(["updateCountry"]),
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = [];
        this.countries.filter((e) => {
          if (e.Country.toLowerCase().includes(v)) {
            this.items.push(e.Country);
          }
        });
        this.loading = false;
      }, 500);
    },
  },
};
</script>
