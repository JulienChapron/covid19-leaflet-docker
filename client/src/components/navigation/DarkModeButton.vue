<template>
  <div class="ml-4">
    <v-tooltip v-if="!$vuetify.theme.dark" bottom>
      <template v-slot:activator="{ on }">
        <v-btn elevation=2 small fab rounded v-on="on" color="primary" @click="darkMode">
          <v-icon color="primary">mdi-moon-waxing-crescent</v-icon>
        </v-btn>
      </template>
      <span>Dark Mode On</span>
    </v-tooltip>

    <v-tooltip v-else bottom>
      <template v-slot:activator="{ on }">
        <v-btn elevation=2 small fab rounded v-on="on" color="secondary" @click="darkMode">
          <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
        </v-btn>
      </template>
      <span>Dark Mode Off</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "DarkModeButton",
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style></style>
