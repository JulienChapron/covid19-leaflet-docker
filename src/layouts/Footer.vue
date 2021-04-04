<template>
  <v-footer class="footer" elevation="4" color="secondary">
    <div style="margin:0 auto;">
      {{ version }}
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },
};
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
