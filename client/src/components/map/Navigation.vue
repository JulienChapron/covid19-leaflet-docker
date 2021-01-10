<template>
  <div class="text-center">
    <v-btn class="mx-2" fab small color="white darken-1" @click="databaseBottomNav">
      <v-icon>mdi-database</v-icon>
    </v-btn>

    <v-btn class="mx-2" fab small color="white darken-1" @click="closeDrawer">
      <v-icon dark>mdi-close</v-icon>
    </v-btn>

    <v-btn class="mx-2" fab small color="white darken-1" @click="newsBottomNav">
      <v-icon>mdi-newspaper-variant-multiple</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BottomNavigation",
  computed: {
    ...mapGetters(["allDataCountry"])
  },
  mounted() {},
  methods: {
    ...mapActions({
      activeNavigationDrawers: "activeNavigationDrawers"
    }),
    newsBottomNav() {
      this.$store.commit("newsBottomNav", true);
      this.$store.commit("databaseBottomNav", false);
    },
    databaseBottomNav() {
      this.$store.commit("databaseBottomNav", true);
      this.$store.commit("newsBottomNav", false);
    },
    closeDrawer() {
      this.activeNavigationDrawers(false);
    }
  }
};
</script>

<style>
</style>
