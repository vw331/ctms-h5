<script setup>
import { defineProps } from "vue";
const props = defineProps({
  fileObj: {
    type: Object,
    required: true,
  },
});
</script>


<template>
  <p>{{ props }}</p>
</template>

<style>
</style>