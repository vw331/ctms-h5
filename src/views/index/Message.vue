<!--消息管理-->
<script setup>
import { useMessage } from '@/service/common'
const { load, list, loading, finished } = useMessage()
</script>

<template>
  <van-list
    inset
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="load"
  >
    <van-cell-group class="my-2">
      <van-cell class="message-item" v-for="item in list" :key="item.id" 
        :title="item.title"
        :label="item.content"
      >
        <template #title>
          <span>{{item.title}}</span>
          <span class="float-right text-gray-400 text-xs">{{item.releaseTime}}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </van-list>
</template>

<style lang="less" scoped>
/* /deep/.message-item {
  .van-cell__value {
    width: 0
  }
} */
</style>