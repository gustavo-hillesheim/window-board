<template>
  <ResizableBox
    :bounds="bounds"
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
        <DraggableBox
          @drag:start="handleDragStart"
          @drag:end="handleDragEnd"
          @drag:move="$emit('move', $event)"
        >
          <FrameMoveHandle />
        </DraggableBox>
      </template>
      <FrameWrapper :style="frameStyle" :url="siteUrl"></FrameWrapper>
    </FrameCard>
  </ResizableBox>
</template>
<script lang="ts">
import Vue from "vue";
import VueResizable from "vue-resizable";

import { Position } from "../../model/frame.model";

import ResizableBox from "./ResizableBox.vue";
import DraggableBox from "./DraggableBox.vue";
import FrameWrapper from "../atoms/FrameWrapper.vue";
import FrameMoveHandle from "../atoms/FrameMoveHandle.vue";
import SiteUrlInput from "../atoms/SiteUrlInput.vue";
import FrameCard from "../molecules/FrameCard.vue";

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
    DraggableBox,
    ResizableBox,
  },
  data: () => ({
    siteUrl: "https://www.google.com/?igu=1",
    isChangingBounds: false,
  }),
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
    handleDragStart(): void {
      this.isChangingBounds = true;
      document.body.style.cursor = "grabbing";
    },
    handleDragEnd(): void {
      this.isChangingBounds = false;
      document.body.style.cursor = "default";
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
