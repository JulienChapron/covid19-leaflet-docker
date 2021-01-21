<template>
  <v-card style="z-index:999;" class="overflow-hidden">
    <v-app-bar color="secondary">
      <v-toolbar-title>covid19-leaflet-docker v0.1</v-toolbar-title>
      <v-spacer></v-spacer>
      <Autocomplete />
      <DarkModeButton />
    </v-app-bar>
  </v-card>
</template>

<script>
import DarkModeButton from "@/components/navigation/DarkModeButton";
import Autocomplete from "@/components/navigation/Autocomplete";
export default {
  name: "Navigation",
  components: {
    DarkModeButton,
    Autocomplete
  },
};
</script>
