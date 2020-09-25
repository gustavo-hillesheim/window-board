<template>
  <div class="window-board">
    <SiteFrame
      v-for="frame in frames"
      :key="frame.id"
      :style="getFrameStyle(frame)"
      @move="moveFrame(frame, $event.offset, $event.resolve)"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { FrameData } from "../../model/frame.model";

import SiteFrame from "./SiteFrame.vue";

export default Vue.extend({
  name: "window-board",
  components: { SiteFrame },
  data: () => ({
    frames: [
      {
        id: 1,
        x: 50,
        y: 50,
        width: 300,
        height: 500,
      },
    ] as FrameData[],
  }),
  methods: {
    getFrameStyle(frame: FrameData) {
      return {
        left: frame.x + "px",
        top: frame.y + "px",
        width: frame.width + "px",
        height: frame.height + "px",
      };
    },
    moveFrame(
      frame: FrameData,
      offset: { x: number; y: number },
      resolveMoving: (hasMoved: boolean) => void
    ) {
      frame.x += offset.x;
      frame.y += offset.y;
      resolveMoving(true);
    },
  },
});
</script>
<style scoped>
.window-board {
  border: 1px solid #eeeeee;
  background-color: #fafafa;
  position: relative;
}
</style>
