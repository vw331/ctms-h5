<script setup>
import { toRefs, provide, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { meta } = toRefs(route);
const isMiniprogram = ref(false);
const isWeixin = ref(false);

onMounted(() => {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    isWeixin.value = true;
    //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
    window.wx.miniProgram.getEnv((res) => {
      if (res.miniprogram) {
        isMiniprogram.value = true;
      }
    });
  } else {
    isWeixin.value = false;
    isMiniprogram.value = false;
  }
});

provide("isMiniprogram", isMiniprogram);
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
