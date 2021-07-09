<template>
  <div class="ml-4">
    <v-tooltip v-if="!$vuetify.theme.dark" bottom>
      <template v-slot:activator="{ on }" class="activator">
        <v-btn elevation=2 small fab rounded v-on="on" color="primary" @click="darkMode">
          <v-icon color="primary">mdi-moon-waxing-crescent</v-icon>
        </v-btn>
      </template>
      <span id="tooltip-text">Dark Mode On</span>
    </v-tooltip>
    <v-tooltip v-else bottom>
      <template v-slot:activator="{ on }">
        <v-btn elevation=2 small fab rounded v-on="on" color="secondary" class="darkmode-button" @click="darkMode">
          <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
        </v-btn>
      </template>
      <span>Dark Mode Off</span>
    </v-tooltip>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "DarkModeButton",
  methods: {
    ...mapActions(['updateTheme']),
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.updateTheme(this.$vuetify.theme.dark);
    },
  },
};
</script>
