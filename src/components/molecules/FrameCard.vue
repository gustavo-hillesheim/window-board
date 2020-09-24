<template>
  <div class="frame-card">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "frame-card",
});
</script>
<style scoped>
.frame-card {
  background-color: white;
  padding: 2px;
  border: 1px solid #e0e0e0;
}
</style>
