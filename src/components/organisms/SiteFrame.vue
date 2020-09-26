<template>
  <VueResizable
    :width="bounds.width"
    :height="bounds.height"
    :left="bounds.x"
    :top="bounds.y"
    :disableAttributes="bounds.disabledBounds"
    @resize:start="isChangingBounds = true"
    @resize:move="handleResize"
    @resize:end="isChangingBounds = false"
  >
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
        :style="frameStyle"
        :url="siteUrl"
        @mouseenter.native.prevent="endDrag"
      ></FrameWrapper>
    </FrameCard>
  </VueResizable>
</template>
<script lang="ts">
import Vue from "vue";
import VueResizable from "vue-resizable";

import { Position } from "../../model/frame.model";

import FrameWrapper from "../atoms/FrameWrapper.vue";
import FrameMoveHandle from "../atoms/FrameMoveHandle.vue";
import SiteUrlInput from "../atoms/SiteUrlInput.vue";
import FrameCard from "../molecules/FrameCard.vue";

type DraggableListener = (e: MouseEvent) => void;

export default Vue.extend({
  name: "site-frame",
  props: {
    bounds: {
      type: Object,
      required: true,
    },
  },
  components: {
    FrameCard,
    FrameWrapper,
    FrameMoveHandle,
    SiteUrlInput,
    VueResizable,
  },
  data: () => ({
    siteUrl: "https://www.google.com/?igu=1",
    isChangingBounds: false,
    currentDragPosition: null as Position,
    boundDragMovement: null as DraggableListener,
    boundEndDrag: null as DraggableListener,
  }),
  created() {
    this.boundDragMovement = this.emitDragMovement.bind(this);
    this.boundEndDrag = this.endDrag.bind(this);
  },
  computed: {
    frameStyle(): any {
      return {
        height: "100%",
        pointerEvents: this.isChangingBounds ? "none" : "auto",
      };
    },
  },
  methods: {
    handleResize(event: any): void {
      this.$emit("update-bounds", {
        x: event.left,
        y: event.top,
        width: event.width,
        height: event.height,
      });
    },
    initDrag(event: MouseEvent): void {
      this.isChangingBounds = true;
      this.currentDragPosition = {
        x: event.clientX,
        y: event.clientY,
      };
      document.body.style.cursor = "grabbing";
      document.addEventListener("mousemove", this.boundDragMovement);
      document.addEventListener("mouseup", this.boundEndDrag);
    },
    endDrag(): void {
      this.isChangingBounds = false;
      this.currentDragPosition = null;
      document.body.style.cursor = "default";
      document.removeEventListener("mousemove", this.boundDragMovement);
      document.removeEventListener("mouseup", this.boundEndDrag);
    },
    emitDragMovement(event: MouseEvent): void {
      if (this.currentDragPosition) {
        const { x: currentX, y: currentY } = this.currentDragPosition;
        const { clientX: newX, clientY: newY } = event;

        const xDelta = newX - currentX;
        const yDelta = newY - currentY;

        this.$emit("move", {
          offset: { x: xDelta, y: yDelta },
          resolve: (newOffset: Position) => {
            // Atualiza os dados da posição atual para que o próximo offset seja calculado corretamente
            if (newOffset && this.currentDragPosition) {
              this.currentDragPosition.x += newOffset.x;
              this.currentDragPosition.y += newOffset.y;
            }
          },
        });
      }
    },
  },
});
</script>
<style scoped>
.frame-card {
  width: 100%;
  height: 100%;
}
</style>
