<template>
  <div style="z-index:0;height:91%">
    <LeafletMap style="z-index:1;position:absolute;height:91%" />
    <SideBar style="z-index:2;position:absolute" />
  </div>
</template>
<script>
import LeafletMap from "@/components/map/LeafletMap";
import SideBar from "@/components/map/SideBar";

export default {
  name: "Map",
  data() {
    return {
      drawer: true
    };
  },
  components: {
    LeafletMap,
    SideBar
  }
};
</script>
<style>
</style>
