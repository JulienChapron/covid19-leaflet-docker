<template>
<div>
  <v-snackbar
    :timeout="-1"
    :value="true"
    absolute
    top
    color="error"
    outlined
    left
    >No data available</v-snackbar
  >
  </div>
</template>
<script>
export default {
  name: "NotificationNoData",
};
</script>
