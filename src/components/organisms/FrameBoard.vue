<template>
  <div class="window-board">
    <SiteFrame />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import SiteFrame from "./SiteFrame.vue";

export default Vue.extend({
  name: "window-board",
  components: { SiteFrame },
});
</script>
<style scoped>
.window-board {
  border: 1px solid #eeeeee;
  background-color: #fafafa;
  position: relative;
}
</style>
