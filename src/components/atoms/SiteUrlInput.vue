<template>
  <input v-model="siteUrl" @keydown.enter="emitSearch" />
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "site-url-input",
  props: {
    initialValue: String,
  },
  data: () => ({
    siteUrl: "",
  }),
  created() {
    if (this.initialValue) {
      this.siteUrl = this.initialValue;
    }
  },
  methods: {
    emitSearch() {
      this.$emit("search", this.siteUrl);
    },
  },
});
</script>
