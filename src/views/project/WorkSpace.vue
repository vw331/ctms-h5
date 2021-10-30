<script setup>
import { inject, ref } from "vue";
import {
  ProjectNews,
  TimeLine,
  CenterList,
  MemList,
} from "@/components/project";

const project = inject("project");
const projectId = inject("projectId");
const center = inject("center");
const mem = inject("mem");

const topStyle = {
  background: `url(${project.projectIcon}) center center no-repeat`,
  "background-size": "cover",
  filter: "brightness(0.5)",
  "z-index": -1,
};
const value = ref("");
const active = ref(0);
</script>

<template>
  <div
    class="relative flex flex-col justify-center text-white text-xs z-10 p-2"
    style="height: 10rem"
  >
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

  <van-tabs v-model:active="active">
    <van-tab title="动态">
      <project-news :projectId="projectId"></project-news>
    </van-tab>
    <van-tab title="进度"
      ><time-line :projectId="projectId"></time-line
    ></van-tab>
    <van-tab title="中心">
      <center-list :center="center"></center-list>
    </van-tab>
    <van-tab title="项目组">
      <mem-list :mem="mem"></mem-list>
    </van-tab>
    <van-tab title="问题">问题</van-tab>
  </van-tabs>
</template>

<style lang="less" scoped>
</style>