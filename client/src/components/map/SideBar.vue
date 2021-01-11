<template>
  <div
    class="grey darken-2"
  >
    <DataCountryList
      :dataCountry="dataCountry"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DataCountryList from "./DataCountryList";

export default {
  name: "SideBar",
  components: {
    DataCountryList,
  },
  computed: {
    ...mapGetters([
      "dataCountry",
      "allDataCountry",
      "countryName",
    ]),
  },
  watch: {
    dataCountry() {
      if (this.dataCountry[0].country !== "US") {
        this.getAllDataCountry(this.dataCountry[0].country);
      } else if (this.dataCountry.country === "US") {
        this.getAllDataCountry("usa");
      } else {
        // refactor name of 'Province/State'
        switch (this.dataCountry[0].province) {
          case "Channel Islands":
            this.dataCountry[0].province = "Jersey";
        }
        this.getAllDataCountry(this.dataCountry[0].province);
      }
    },
    allDataCountry() {
      if (this.allDataCountry[0].alpha2Code !== undefined)
        this.getLastNewsCountry(this.allDataCountry[0].alpha2Code);
    },
  },
  methods: {
    ...mapActions(["getAllDataCountry", "getLastNewsCountry"]),
  },
};
</script>
