<template>
  <div class="layout">
    <slot name="header" class="header"></slot>
    <slot name="content"></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "page-layout-template",
});
</script>
<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
