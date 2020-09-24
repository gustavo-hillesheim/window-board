<template>
  <iframe :src="url" frameborder="0" allowfullscreen></iframe>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "frame-wrapper",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
});
</script>
