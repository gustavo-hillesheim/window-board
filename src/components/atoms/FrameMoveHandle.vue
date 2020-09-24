<template>
  <div @mousedown="initMovement" @mouseup="endMovement">MOVER</div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "frame-move-handle",
  data: () => ({
    initialHandlePosition: null,
  }),
  methods: {
    initMovement(event: MouseEvent) {
      console.log(event);
    },
    endMovement(event: MouseEvent) {
      console.log(event);
    },
  },
});
</script>