<template>
  <div
    :style="windowWidth"
    id="sideBar"
    class="grey darken-2"
    v-if="open && !loadingDataCountry"
  >
    <Navigation v-if="open" style="height:45px; top:0px;" />
    <!-- data graph -->
    <DataCountryList
      style="font-size:14px;"
      v-if="databaseBottomNav"
      :dataCountry="dataCountry"
    />
    <!-- news -->
    <NewsDataCountry
      :style="newsCountry.articles.length ? 'top:3em;font-size:14px; height:82vh': 'top:3em;font-size:14px; height:5vh'"
      :allDataCountry="allDataCountry"
      v-if="newsBottomNav"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DataCountryList from "./DataCountryList";
import Navigation from "./Navigation";
import NewsDataCountry from "./NewsDataCountry";

export default {
  name: "NavigationDrawers",
  components: {
    Navigation,
    DataCountryList,
    NewsDataCountry,
  },
  data() {
    return {
      windowWidth: 0,
      events: [],
    };
  },
  computed: {
    ...mapGetters([
      "dataCountry",
      "allDataCountry",
      "loadingDataCountry",
      "databaseBottomNav",
      "newsBottomNav",
      "countryName",
      "newsCountry"
    ]),
    open: {
      get() {
        return this.$store.state.map.activeNavigationDrawers;
      },
      set() {
        return this.$store.state.map.activeNavigationDrawers;
      },
    },
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
  beforeCreate() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      // Init
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    ...mapActions(["getAllDataCountry", "getLastNewsCountry"]),
    getWindowWidth(event) {
      this.windowWidth =
        document.documentElement.clientWidth < 480
          ? "width:" + document.documentElement.clientWidth - 40 + "px"
          : "width:" + 480 + "px";
      this.events.push(event);
    },
  },
};
</script>
<style scoped>
#sideBar {
  min-width: 320px;
  height: auto;
  overflow: auto;
  overflow-x: hidden;
  top: 8%;
  left: 0px;
  border-radius: 5px;
  padding: 1em;
}
</style>
