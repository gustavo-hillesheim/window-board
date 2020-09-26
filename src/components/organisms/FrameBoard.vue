<template>
  <div class="window-board" ref="board">
    <SiteFrame
      v-for="frame in frames"
      :key="frame.id"
      :bounds="frame"
      @update-bounds="updateBounds(frame, $event)"
      @move="moveFrame(frame, $event.offset, $event.resolve)"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Position } from "vue-router/types/router";

import {
  DisableableRectagle,
  FrameData,
  Rectangle,
} from "../../model/frame.model";

import SiteFrame from "./SiteFrame.vue";

const MINIMUM_FRAME_WIDTH = 300;
const MINIMUM_FRAME_HEIGHT = 500;

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
    ): void {
      const { x: currentX, y: currentY } = frame;
      const { x: newX, y: newY } = this.getNewPosition(frame, offset);
      frame.x = newX;
      frame.y = newY;
      resolveMoving({ x: newX - currentX, y: newY - currentY });
    },
    getNewPosition(frame: FrameData, offset: Position): Position {
      const newPosition: Rectangle = {
        x: frame.x + offset.x,
        y: frame.y + offset.y,
        width: frame.width,
        height: frame.height,
      };
      this.clampPosition(newPosition);
      return newPosition;
    },
    updateBounds(frame: FrameData, newBounds: Rectangle): void {
      const updatedBounds = this.getNewBounds(newBounds);
      frame.x = updatedBounds.x;
      frame.y = updatedBounds.y;
      frame.width = updatedBounds.width;
      frame.height = updatedBounds.height;
      frame.disabledBounds = updatedBounds.disabledBounds;
    },
    getNewBounds(bounds: Rectangle): DisableableRectagle {
      let { x, y, width, height } = bounds;

      const disabledBounds: string[] = this.clampSize(bounds);
      this.clampPosition(bounds).forEach((clamped) =>
        disabledBounds.push(clamped)
      );

      return {
        x,
        y,
        width,
        height,
        disabledBounds,
      };
    },
    getBoardOverflow(bounds: Rectangle): Position {
      const boardWidth = this.board.clientWidth;
      const boardHeight = this.board.clientHeight;

      const overflowX = bounds.x + bounds.width - boardWidth;
      const overflowY = bounds.y + bounds.height - boardHeight;
      return {
        x: overflowX,
        y: overflowY,
      };
    },
    clampSize(rectangle: Rectangle): ("w" | "h")[] {
      const clampedBounds: Set<"w" | "h"> = new Set();
      const { x: boardOverflowX, y: boardOverflowY } = this.getBoardOverflow(
        rectangle
      );

      if (rectangle.width < MINIMUM_FRAME_WIDTH) {
        rectangle.width = MINIMUM_FRAME_WIDTH;
        clampedBounds.add("w");
      }
      if (rectangle.height < MINIMUM_FRAME_HEIGHT) {
        rectangle.height = MINIMUM_FRAME_HEIGHT;
        clampedBounds.add("h");
      }
      if (boardOverflowX > 0) {
        rectangle.width -= boardOverflowX;
        clampedBounds.add("w");
      }
      if (boardOverflowY > 0) {
        rectangle.height -= boardOverflowY;
        clampedBounds.add("h");
      }

      return Array.from(clampedBounds);
    },
    clampPosition(rectangle: Rectangle): ("l" | "t")[] {
      const clampedBounds: Set<"l" | "t"> = new Set();
      const { x: boardOverflowX, y: boardOverflowY } = this.getBoardOverflow({
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width,
        height: rectangle.height,
      });

      if (rectangle.x < 0) {
        rectangle.x = 0;
        clampedBounds.add("l");
      }
      if (rectangle.y < 0) {
        rectangle.y = 0;
        clampedBounds.add("t");
      }
      if (boardOverflowX > 0) {
        rectangle.x -= boardOverflowX;
        clampedBounds.add("l");
      }
      if (boardOverflowY > 0) {
        rectangle.y -= boardOverflowY;
        clampedBounds.add("t");
      }

      return Array.from(clampedBounds);
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
