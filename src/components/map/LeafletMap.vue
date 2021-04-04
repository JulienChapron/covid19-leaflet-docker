<template>
  <div>
    <l-map
      :options="{ zoomControl: false }"
      :zoom="zoom"
      :center="initialLocation"
    >
      <l-tile-layer
        :name="this.$vuetify.theme.dark ? 'light' : 'dark'"
        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
        :url="
          this.$vuetify.theme.dark
            ? 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
            : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
        "
        layer-type="base"
        :options="{ scrollWheelZoom: false, minZoom: 3, dragging: false }"
      ></l-tile-layer>
      <l-marker-cluster
        :options="clusterOptions"
        @clusterclick="click()"
        @ready="ready"
      >
        <l-marker
          @click="setCountry(country.country)"
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
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { latLng, Icon } from "leaflet";
import countries from "../../assets/json/countries.json";
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
  name: "LeafletMap",
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
      clusterOptions: {},
      initialLocation: latLng(46.7, 1.7),
      zoom: 6,
      countriesJsonPosition: countries,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["getCountry", "getCountryLatLng"]),
  },
  watch: {
    getCountry() {
      if (this.getCountry !== undefined && this.getCountry !== null) {
        this.countryLongitudeLatitude();
      }
    },
    getCountryLatLng() {
      if (
        this.getCountryLatLng!==undefined
      ) {
        this.initialLocation = latLng(
          this.getCountryLatLng.Lat,
          this.getCountryLatLng.Lon
        );
        this.zoom = 6;
      }
    },
  },
  async mounted() {
    await this.markersCountries();
    await this.countryLongitudeLatitude();
    setTimeout(() => {
      this.$nextTick(() => {
        this.clusterOptions = { disableClusteringAtZoom: 11 };
      });
    }, 3000);
  },
  methods: {
    ...mapActions(["country", "countryLongitudeLatitude"]),
    click: (e) => e,
    ready: (e) => e,
    setCountry(country) {
      this.country(country);
    },
    markersCountries() {
      for (
        let i = 0;
        i < this.countriesJsonPosition.ref_country_codes.length;
        i++
      ) {
        this.locations.push({
          id: i,
          country: this.countriesJsonPosition.ref_country_codes[i].country,
          latlng: latLng(
            this.countriesJsonPosition.ref_country_codes[i].latitude,
            this.countriesJsonPosition.ref_country_codes[i].longitude
          ),
          text: this.countriesJsonPosition.ref_country_codes[i].country,
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
.leaflet-top,
.leaflet-bottom {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  font-size: 8px;
}
</style>
