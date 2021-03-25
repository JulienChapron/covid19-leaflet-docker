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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Autocomplete",
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
      this.country(this.select);
    },
  },
  computed:{
    ...mapGetters(["getCountries"])
  },
  async mounted() {
    await this.$store.dispatch("countries")
  },
  methods: {
    ...mapActions(["country"]),
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = [];
        this.getCountries.filter((e) => {
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
