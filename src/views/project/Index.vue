
<template>
  <div class="bg-gray-100 min-h-screen">
    <van-nav-bar
      fixed
      placeholder
      :title="detail.projectName"
    />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>

import { provide, defineProps } from 'vue'

const props = defineProps({
  projectId: String,
  detail: Object
})

provide('project', props.detail)

</script>

<style>

</style>