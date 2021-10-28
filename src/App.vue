<script setup>
import { toRefs } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { meta } = toRefs(route);
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive v-if="meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </transition>
  </router-view>
</template>
