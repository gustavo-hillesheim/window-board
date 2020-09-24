<template>
  <FrameCard>
    <template #cardHeader>
      <SiteUrlInput
        style="flex: 1"
        :initialValue="siteUrl"
        @search="siteUrl = $event"
      />
      <FrameMoveHandle
        @mousedown.native="initDrag"
        @mouseup.native="endDrag"
        @mousemove.native="emitDragMovement"
      />
    </template>
    <FrameWrapper style="height: 100%" :url="siteUrl"></FrameWrapper>
  </FrameCard>
</template>
<script lang="ts">
import Vue from "vue";

import { Position } from "../../model/frame.model";

import FrameWrapper from "../atoms/FrameWrapper.vue";
import FrameMoveHandle from "../atoms/FrameMoveHandle.vue";
import SiteUrlInput from "../atoms/SiteUrlInput.vue";
import FrameCard from "../molecules/FrameCard.vue";

export default Vue.extend({
  name: "site-frame",
  components: { FrameCard, FrameWrapper, FrameMoveHandle, SiteUrlInput },
  data: () => ({
    siteUrl: "https://clima.gustavohill.dev",
    initialDragPosition: null as Position | null,
  }),
  methods: {
    initDrag(event: MouseEvent): void {
      this.initialDragPosition = {
        x: event.offsetX,
        y: event.offsetY,
      };
    },
    endDrag(): void {
      this.initialDragPosition = null;
    },
    emitDragMovement(event: MouseEvent): void {
      if (this.initialDragPosition) {
        const { x: currentX, y: currentY } = this.initialDragPosition;
        const { offsetX: newX, offsetY: newY } = event;
        const xDelta = newX - currentX;
        const yDelta = newY - currentY;
        this.$emit("move", { offsetX: xDelta, offsetY: yDelta });
      }
    },
  },
});
</script>
