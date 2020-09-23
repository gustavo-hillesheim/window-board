<template>
  <PageLayoutTemplate>
    <template #header>
      <TheHeader />
    </template>
    <template #content>
      <router-view />
    </template>
  </PageLayoutTemplate>
</template>
<script lang="ts">
import Vue from "vue";

import PageLayoutTemplate from "./templates/PageLayoutTemplate.vue";
import TheHeader from "./molecules/TheHeader.vue";

export default Vue.extend({
  name: "page-layout",
  components: { TheHeader, PageLayoutTemplate },
});
</script>
