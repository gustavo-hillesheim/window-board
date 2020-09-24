<template>
  <BoardPageTemplate>
    <template #board>
      <FrameBoard />
    </template>
  </BoardPageTemplate>
</template>

<script lang="ts">
import Vue from "vue";

import BoardPageTemplate from "../components/templates/BoardPageTemplate.vue";
import FrameBoard from "../components/organisms/FrameBoard.vue";

export default Vue.extend({
  name: "board-page",
  components: { BoardPageTemplate, FrameBoard },
});
</script>
<style scoped>
.board-page-content {
  display: flex;
  flex-direction: column;
}
.window-board {
  flex: 1;
}
</style>
