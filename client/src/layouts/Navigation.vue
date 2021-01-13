<template>
  <v-app-bar class="textcolor--text" color="secondary">
    <v-toolbar-title >covid19-leaflet-docker v0.1</v-toolbar-title>    
    <v-spacer></v-spacer>
    <DarkModeButton/>
    <div>
      <v-autocomplete
        style="z-index:999;top:10px;"
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        hide-no-data
        clearable
        label="Choose your country"
      ></v-autocomplete>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import DarkModeButton from "@/components/navigation/DarkModeButton";
export default {
  name: "Navigation",
  components: {
    DarkModeButton,
  },
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
    },
  },
  mounted() {
    axios
      .get("https://api.covid19api.com/countries")
      .then((response) => (this.countries = response.data));
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = [];
        this.countries.filter((e) => {
          if (e.Country.toLowerCase().includes(v)) {
            this.items.push(e.Country);
          }
        });
        console.log(this.items, "items");
        this.loading = false;
      }, 500);
    },
  },
};
</script>
