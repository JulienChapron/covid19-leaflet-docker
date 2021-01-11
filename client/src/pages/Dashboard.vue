<template>
<div>
  <v-row no-gutters>
    <v-col cols="12" xs="12" sm="12" md="6" lg="4">
      <WorldData style="margin:1vh;height:43.5vh"/>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="8">
      <LeafletMap style="margin:1vh;height:43.5vh;width:auto !important"/>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12" xs="12" sm="12" md="6" lg="4">
      <SideBar style="margin:1vh;height:43.5vh"/>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="8">
      <SideBar style="margin:1vh;height:43.5vh"/>
    </v-col>
  </v-row>
  </div>
</template>
<script>
import LeafletMap from "@/components/map/LeafletMap";
import SideBar from "@/components/map/SideBar";
import WorldData from "@/components/dashboard/WorldData";
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
    };
  },
  created(){
    this.$store.dispatch("getDataMarkersCountries");
  },
    components: {
    LeafletMap,
    SideBar,
    WorldData
  },
};
</script>
