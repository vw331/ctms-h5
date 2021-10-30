<script setup>
import { defineProps } from "vue";
import { useNews } from "@/service/project/index";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const { onLoad, onRefresh, refreshing, error, list, loading, finished } =
  useNews(props.projectId);
</script>


<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      inset
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.title"
        :label="item.content"
        :icon="item.user.avatar"
      >
        <template #icon>
          <van-image
            round
            class="p-1"
            width="2.6rem"
            height="2.6rem"
            :src="item.user.realName"
          />
        </template>
        <template #title>
          <span>{{ item.user.realName }}{{ item.bizDetail }}</span>
          <span class="float-right text-gray-400 text-xs">{{
            item.createTime
          }}</span>
        </template>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>


<style>
</style>