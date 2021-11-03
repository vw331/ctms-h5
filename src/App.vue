<script setup>
import { provide, ref, onMounted, toRef, watchEffect, watch } from "vue";
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
  <router-view> </router-view>
</template>
