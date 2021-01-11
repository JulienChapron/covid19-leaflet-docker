<template>
  <v-app-bar
      style=""
      color="primary"
      dense
      dark
    >
      <v-toolbar-title>covid19-leaflet-docker v0.1</v-toolbar-title>

      <v-spacer></v-spacer>
      <div>
      <v-autocomplete
      cache-items
      flat
      hide-no-data
      hide-details
      label="What state are you from?"
    ></v-autocomplete></div>

    </v-app-bar>
</template>

<script>
export default {
  name: "Navigation"
};
</script>
