<!--消息管理-->
<script setup>
import { useMessage } from '@/service/common'
const { onLoad, onRefresh, refreshing, error, list, loading, finished } = useMessage()
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
      <van-cell-group class="my-2">
        <van-cell class="message-item" v-for="item in list" :key="item.id" 
          :title="item.title"
          :label="item.content"
        >
          <template #icon>
            <span class="border rounded-full h-10 m-2 w-10 flex items-center justify-center">
              <van-icon class="text-lg" name="comment-o" />
            </span>
          </template>
          <template #title>
            <span>{{item.title}}</span>
            <span class="float-right text-gray-400 text-xs">{{item.releaseTime}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </van-pull-refresh>  
</template>

<style lang="less" scoped>

</style>