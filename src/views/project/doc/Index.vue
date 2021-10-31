<script setup>
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-if="$route.meta.keepAliveDoc" :is="Component" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAliveDoc" />
  </router-view>
</template>

<style>
</style>