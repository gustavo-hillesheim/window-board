<template>
  <div class="window-board">
    <FrameCard>
      <FrameMoveHandle />
      <SiteFrame style="height: 100%"></SiteFrame>
    </FrameCard>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import FrameCard from "../molecules/FrameCard.vue";
import SiteFrame from "../atoms/SiteFrame.vue";
import FrameMoveHandle from "../atoms/FrameMoveHandle.vue";

export default Vue.extend({
  name: "window-board",
  components: { FrameCard, SiteFrame, FrameMoveHandle },
});
</script>
<style scoped>
.window-board {
  border: 1px solid #eeeeee;
  background-color: #fafafa;
  position: relative;
}
</style>
