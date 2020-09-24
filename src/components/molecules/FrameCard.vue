<template>
  <div class="frame-card">
    <div class="frame-card-header">
      <slot name="cardHeader"></slot>
    </div>
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
  padding: 8px;
  border: 1px solid #e0e0e0;
  position: absolute;
  display: flex;
  flex-direction: column;
  resize: both;
  overflow: auto;
}
.frame-card-header {
  display: flex;
  flex-direction: row;
}
</style>
