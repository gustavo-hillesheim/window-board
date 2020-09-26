<template>
  <div class="resizable-box">
    <slot></slot>
    <DraggableBox
      v-for="handlerPosition in handlerPositions"
      :key="handlerPosition"
      :style="handlerStyle(handlerPosition)"
      :class="'resizable-handler-' + handlerPosition"
    ></DraggableBox>
  </div>
</template>
<script lang="ts">
import { Rectangle } from "@/model/frame.model";
import Vue from "vue";

import DraggableBox from "./DraggableBox.vue";

type ResizablePosition =
  | "left"
  | "left-top"
  | "top"
  | "right-top"
  | "right"
  | "right-bottom"
  | "bottom"
  | "left-bottom";

export default Vue.extend({
  name: "resizable-box",
  components: { DraggableBox },
  props: {
    bounds: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    actualBounds: null as Rectangle,
  }),
  computed: {
    handlerPositions(): ResizablePosition[] {
      return [
        "left",
        "left-top",
        "top",
        "right-top",
        "right",
        "right-bottom",
        "bottom",
        "left-bottom",
      ];
    },
  },
  created() {
    const actualBounds: Rectangle = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    if (this.bounds) {
      this.actualBounds.x = this.bounds.x || 0;
      this.actualBounds.y = this.bounds.y || 0;
      this.actualBounds.width = this.bounds.width || 0;
      this.actualBounds.height = this.bounds.height || 0;
    }
    this.actualBounds = actualBounds;
  },
  methods: {
    handlerStyle(position: ResizablePosition): { [key: string]: string } {
      return {
        cursor: this.getCursor(position),
        position: "absolute",
        top: this.getTopMargin(position),
        left: this.getLeftMargin(position),
        bottom: this.getBottomMargin(position),
        right: this.getRightMargin(position),
        width: this.getWidth(position),
        height: this.getHeight(position),
      };
    },
    getCursor(position: ResizablePosition): string {
      const positionToCursor = {
        left: "w-resize",
        "left-top": "nw-resize",
        top: "n-resize",
        "right-top": "ne-resize",
        right: "e-resize",
        "right-bottom": "se-resize",
        bottom: "s-resize",
        "left-bottom": "sw-resize",
      };
      return positionToCursor[position];
    },
    getTopMargin(position: ResizablePosition): string {
      return {
        left: "5px",
        "left-top": "0px",
        top: "0px",
        "right-top": "0px",
        right: "5px",
        "right-bottom": null,
        bottom: null,
        "left-bottom": null,
      }[position];
    },
    getLeftMargin(position: ResizablePosition): string {
      return {
        left: "0px",
        "left-top": "0px",
        top: "5px",
        "right-top": null,
        right: null,
        "right-bottom": null,
        bottom: "5px",
        "left-bottom": "0px",
      }[position];
    },
    getBottomMargin(position: ResizablePosition): string {
      return {
        left: "5px",
        "left-top": null,
        top: null,
        "right-top": null,
        right: "5px",
        "right-bottom": "0px",
        bottom: "0px",
        "left-bottom": "0px",
      }[position];
    },
    getRightMargin(position: ResizablePosition): string {
      return {
        left: null,
        "left-top": null,
        top: "5px",
        "right-top": "0px",
        right: "0px",
        "right-bottom": "0px",
        bottom: "5px",
        "left-bottom": null,
      }[position];
    },
    getWidth(position: ResizablePosition): string {
      return {
        left: "5px",
        "left-top": "5px",
        top: null,
        "right-top": "5px",
        right: "5px",
        "right-bottom": "5px",
        bottom: null,
        "left-bottom": "5px",
      }[position];
    },
    getHeight(position: ResizablePosition): string {
      return {
        left: null,
        "left-top": "5px",
        top: "5px",
        "right-top": "5px",
        right: null,
        "right-bottom": "5px",
        bottom: "5px",
        "left-bottom": "5px",
      }[position];
    },
  },
});
</script>
<style scoped>
.resizable-box {
  position: relative;
}
</style>
