<template>
  <div class="board-page-content">
    <slot name="board"></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "board-page-template",
});
</script>
<style scoped>
.board-page-content {
  padding: 16px;
  flex: 1;
}
</style>
