<template>
  <div class="frame-move-handle">MOVER</div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "frame-move-handle",
  data: () => ({
    initialHandlePosition: null,
  }),
});
</script>
<style scoped>
.frame-move-handle {
  user-select: none;
  cursor: move;
  cursor: grab;
}
.frame-move-handle:active {
  cursor: grabbing;
}
</style>
