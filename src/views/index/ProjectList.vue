<script setup>
import { useProjectList } from '@/service/project/index'
const { loading, list, onLoad, finished, onRefresh, refreshing, } = useProjectList()
</script>

<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell 
        v-for="item in list" 
        class="project-item-cell"
        :key="item" 
        :title="item.projectName" 
        :label="`创建人: ${item.createUsername || '-'}`"
        :to="{name: 'paoject', params: { projectId: item.id}}"
      >
        <template #icon>
          <van-image
            class="mr-2"
            width="60px"
            height="60px"
            fit="cover"
            :src="item.projectIcon"
          />
        </template>
        <template #value>
          <van-tag v-if="['stop', 'end'].includes(item.projectStatus)" type="danger">{{item.projectStatusDesc}}</van-tag>
        </template>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<style lang="less" scoped>
.project-item-cell {
  margin: .5rem;
  width: auto
}
</style>