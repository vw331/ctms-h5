<script setup>
import { inject } from 'vue'
const project = inject('project')
</script>

<template>
  {{ project }}
  <router-link to="/project/345/info">345info</router-link>
</template>

<style>

</style>