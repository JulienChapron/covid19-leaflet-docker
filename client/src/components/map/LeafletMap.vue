<template>
  <div>
    <l-map :zoom="3" :center="initialLocation">
      <l-tile-layer
        :name="this.$vuetify.theme.dark ? 'light' : 'dark'"
        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
        :url="this.$vuetify.theme.dark ? 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png' : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'"
        layer-type="base"
        :options="{ scrollWheelZoom: false, minZoom: 3, dragging: false }"
      ></l-tile-layer>
      <l-marker-cluster
        :options="clusterOptions"
        @clusterclick="click()"
        @ready="ready"
      >
        <l-marker
          @click="getData(country)"
          v-for="country in locations"
          :key="country.id"
          :lat-lng="country.latlng"
        >
          <l-popup :content="country.text"></l-popup>
        </l-marker>
      </l-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
} from "vue2-leaflet";
import { latLng, Icon } from "leaflet";
import Vue2LeafletMarkercluster from "@/components/map/plugins/Vue2LeafletMarkercluster.vue";
import "./plugins/leaflet-tilelayer-subpixel-fix";
import { mapGetters, mapActions } from "vuex";

// quick fix if marker icons are missing
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    "l-marker-cluster": Vue2LeafletMarkercluster,
  },
  data() {
    return {
      markers: [],
      locations: [],
      clusterOptions: {
        color: "#fff",
      },
      initialLocation: latLng(46.7, 1.7),
    };
  },
  computed: {
    ...mapGetters(["markersCountries"]),
  },
  watch: {
    markersCountries() {
      this.markerData();
    },
  },
  mounted() {
    if (this.markersCountries.length) {
      this.markerData();
    }
    setTimeout(() => {
      this.$nextTick(() => {
        this.clusterOptions = { disableClusteringAtZoom: 11 };
      });
    }, 5000);
  },
  methods: {
    ...mapActions([
      "getDataCountry",
      "activeNavigationDrawers",
      "getDataMarkersCountries",
    ]),
    getData(markerData) {
      if (markerData.country === "US") {
        this.getDataCountry([markerData.country, markerData.text, "NC"]);
      } else if (markerData.country !== markerData.text) {
        this.getDataCountry([markerData.country, "NC", markerData.text]);
      } else {
        this.getDataCountry([markerData.country, "NC", "NC"]);
      }
    },
    click: (e) => e,
    ready: (e) => e,
    markerData() {
      for (let i = 0; i < this.markersCountries.length; i++) {
        this.locations.push({
          id: i,
          country: this.markersCountries[i].country,
          latlng: latLng(
            this.markersCountries[i].Lat,
            this.markersCountries[i].Long
          ),
          text:
            this.markersCountries[i].province === ""
              ? this.markersCountries[i].country
              : this.markersCountries[i].province,
        });
      }
    },
  },
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.marker-cluster-small div {
  background-color:#2ec4b6;
  color: white;
}
.marker-cluster-medium div {
  background-color: #ff9f1c;
  color: white;
  
}
.marker-cluster-large div {
  background-color: #e71d36;
  color: white;
}
.leaflet-top, .leaflet-bottom {
    position: absolute;
    z-index: 1000;
    pointer-events: none;
    font-size:8px;
}
</style>