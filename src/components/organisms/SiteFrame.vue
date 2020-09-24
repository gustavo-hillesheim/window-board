<template>
  <FrameCard>
    <template #cardHeader>
      <SiteUrlInput
        style="flex: 1"
        :initialValue="siteUrl"
        @search="siteUrl = $event"
      />
      <FrameMoveHandle />
    </template>
    <FrameWrapper style="height: 100%" :url="siteUrl"></FrameWrapper>
  </FrameCard>
</template>
<script lang="ts">
import Vue from "vue";

import FrameWrapper from "../atoms/FrameWrapper.vue";
import FrameMoveHandle from "../atoms/FrameMoveHandle.vue";
import SiteUrlInput from "../atoms/SiteUrlInput.vue";
import FrameCard from "../molecules/FrameCard.vue";

export default Vue.extend({
  name: "site-frame",
  components: { FrameCard, FrameWrapper, FrameMoveHandle, SiteUrlInput },
  data: () => ({
    siteUrl: "https://clima.gustavohill.dev",
  }),
});
</script>
