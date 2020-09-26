<template>
  <div
    class="draggable-box"
    @mousedown.prevent="initDrag"
    @mouseup.prevent="endDrag"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { Position } from "@/model/frame.model";

type DraggableListener = (e: MouseEvent) => void;

export default Vue.extend({
  name: "draggable-box",
  data: () => ({
    dragPosition: null as Position,
    boundDragMovement: null as DraggableListener,
    boundEndDrag: null as DraggableListener,
  }),
  created() {
    this.boundDragMovement = this.emitDragMovement.bind(this);
    this.boundEndDrag = this.endDrag.bind(this);
  },
  methods: {
    initDrag(event: MouseEvent): void {
      this.dragPosition = {
        x: event.clientX,
        y: event.clientY,
      };
      document.addEventListener("mousemove", this.boundDragMovement);
      document.addEventListener("mouseup", this.boundEndDrag);
      this.$emit("drag:start", this.dragPosition);
    },
    endDrag(): void {
      const currentDragPosition = this.dragPosition;
      this.dragPosition = null;
      document.removeEventListener("mousemove", this.boundDragMovement);
      document.removeEventListener("mouseup", this.boundEndDrag);
      this.$emit("drag:end", currentDragPosition);
    },
    emitDragMovement(event: MouseEvent): void {
      if (this.dragPosition) {
        const { x: currentX, y: currentY } = this.dragPosition;
        const { clientX: newX, clientY: newY } = event;

        const xDelta = newX - currentX;
        const yDelta = newY - currentY;

        this.$emit("drag:move", {
          offset: { x: xDelta, y: yDelta },
          resolve: (newOffset: Position) => {
            // Atualiza os dados da posição atual para que o próximo offset seja calculado corretamente
            if (newOffset && this.dragPosition) {
              this.dragPosition.x += newOffset.x;
              this.dragPosition.y += newOffset.y;
            }
          },
        });
      }
    },
  },
});
</script>
