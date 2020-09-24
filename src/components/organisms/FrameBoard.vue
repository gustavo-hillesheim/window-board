<template>
  <div class="window-board">
    <FrameCard>
      <SiteFrame></SiteFrame>
    </FrameCard>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import FrameCard from "../molecules/FrameCard.vue";
import SiteFrame from "../atoms/SiteFrame.vue";

export default Vue.extend({
  name: "window-board",
  components: { FrameCard, SiteFrame },
});
</script>
<style scoped>
.window-board {
  border: 1px solid #eeeeee;
  background-color: #fafafa;
}
</style>
