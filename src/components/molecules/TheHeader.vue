<template>
  <div class="header">
    <TheLogo />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import TheLogo from "../atoms/TheLogo.vue";

export default Vue.extend({
  name: "the-header",
  components: { TheLogo },
});
</script>
<style scoped>
.header {
  display: flex;
  min-height: 50px;
  min-width: 100%;
  background-color: #ef5350;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px;
}

.logo {
  margin: auto 0;
  padding-left: 16px;
}
</style>
