<script setup>
import { inject, ref } from "vue";
const project = inject("project");
const topStyle = {
  background: `url(${project.projectIcon}) center center no-repeat`,
  "background-size": "cover",
  filter: "brightness(0.5)",
  "z-index": -1,
};
const value = ref("");
</script>

<template>
  <div
    class="relative flex flex-col justify-center text-white text-xs z-10 p-2"
    style="height: 10rem"
  >
    <h2 class="text-md text-center">{{ project.projectName }}</h2>
    <van-search
      v-model="value"
      background="transparent"
      placeholder="受试者姓名、号码、文件名称等关键字"
    />
    <div
      class="absolute inset-0 w-full text-white p-lg"
      :style="topStyle"
    ></div>
  </div>
  <router-link to="/project/345/info">345info</router-link>
</template>

<style lang="less" scoped>
</style>