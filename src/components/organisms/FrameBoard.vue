<template>
  <div class="window-board" ref="board">
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
import { Position } from "vue-router/types/router";

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
  computed: {
    board(): HTMLElement {
      console.log(this.$refs);
      return this.$refs["board"] as HTMLElement;
    },
  },
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
      resolveMoving: (newPosition: Position) => void
    ) {
      const { x: currentX, y: currentY } = frame;
      const { x: newX, y: newY } = this.getNewPosition(frame, offset);
      frame.x = newX;
      frame.y = newY;
      resolveMoving({ x: newX - currentX, y: newY - currentY });
    },
    getNewPosition(frame: FrameData, offset: Position): Position {
      const newPosition: Position = {
        x: frame.x + offset.x,
        y: frame.y + offset.y,
      };
      const boardWidth = this.board.clientWidth;
      const boardHeight = this.board.clientHeight;

      newPosition.x = newPosition.x < 0 ? 0 : newPosition.x;
      newPosition.y = newPosition.y < 0 ? 0 : newPosition.y;

      const boardOverflowX = newPosition.x + frame.width - boardWidth;
      const boardOverflowY = newPosition.y + frame.height - boardHeight;

      if (boardOverflowX > 0) {
        newPosition.x -= boardOverflowX;
      }
      if (boardOverflowY > 0) {
        newPosition.y -= boardOverflowY;
      }

      return newPosition;
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
