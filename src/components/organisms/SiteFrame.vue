<template>
  <FrameCard>
    <template #cardHeader>
      <SiteUrlInput
        style="flex: 1"
        :initialValue="siteUrl"
        @search="siteUrl = $event"
      />
      <FrameMoveHandle
        @mousedown.native.prevent="initDrag"
        @mouseup.native.prevent="endDrag"
      />
    </template>
    <FrameWrapper
      style="height: 100%"
      :url="siteUrl"
      @mouseenter.native.prevent="endDrag"
    ></FrameWrapper>
  </FrameCard>
</template>
<script lang="ts">
import Vue from "vue";

import { Position } from "../../model/frame.model";

import FrameWrapper from "../atoms/FrameWrapper.vue";
import FrameMoveHandle from "../atoms/FrameMoveHandle.vue";
import SiteUrlInput from "../atoms/SiteUrlInput.vue";
import FrameCard from "../molecules/FrameCard.vue";

type DraggableListener = (e: MouseEvent) => void;

export default Vue.extend({
  name: "site-frame",
  components: { FrameCard, FrameWrapper, FrameMoveHandle, SiteUrlInput },
  data: () => ({
    siteUrl: "https://clima.gustavohill.dev",
    currentDragPosition: null as Position,
    boundDragMovement: null as DraggableListener,
  }),
  created() {
    this.boundDragMovement = this.emitDragMovement.bind(this);
  },
  methods: {
    initDrag(event: MouseEvent): void {
      this.currentDragPosition = {
        x: event.clientX,
        y: event.clientY,
      };
      document.addEventListener("mousemove", this.boundDragMovement);
    },
    endDrag(): void {
      this.currentDragPosition = null;
      document.removeEventListener("mousemove", this.boundDragMovement);
    },
    emitDragMovement(event: MouseEvent): void {
      if (this.currentDragPosition) {
        const { x: currentX, y: currentY } = this.currentDragPosition;
        const { clientX: newX, clientY: newY } = event;

        const xDelta = newX - currentX;
        const yDelta = newY - currentY;

        this.$emit("move", {
          offset: { x: xDelta, y: yDelta },
          resolve: (moved: boolean) => {
            // Atualiza os dados da posição atual para que o próximo offset seja calculado corretamente
            if (moved && this.currentDragPosition) {
              this.currentDragPosition.x += xDelta;
              this.currentDragPosition.y += yDelta;
            }
          },
        });
      }
    },
  },
});
</script>
