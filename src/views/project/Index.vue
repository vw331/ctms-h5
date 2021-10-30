
<template>
  <div class="bg-gray-100 min-h-screen">
    <van-nav-bar
      fixed
      placeholder
      :title="detail.projectName"
      right-text=""
      z-index="99"
    >
      <template #left>
        <van-icon @click="showPopup = !showPopup" name="wap-nav" size="18" />
      </template>
      <!--
      <template #title>
        <div class="px-4">
          <van-dropdown-menu>
            <van-dropdown-item
              teleport="body"
              v-model="value"
              :options="options"
            />
          </van-dropdown-menu>
        </div>
      </template>
      -->
      <template #right>
        <router-link :to="{ name: 'ProjectList' }">
          <van-icon name="close" size="18" />
        </router-link>
      </template>
    </van-nav-bar>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <van-popup
      v-model:show="showPopup"
      position="left"
      class="bg-gray-100"
      :style="{ height: '100vh', width: '80%' }"
    >
      <van-cell-group inset title="审批管理">
        <van-cell title="待办事项" is-link />
        <van-cell title="我的请求" is-link />
        <van-cell title="我的已办" is-link />
        <van-cell title="办结事宜" is-link />
        <van-cell title="抄送事宜" is-link />
      </van-cell-group>
      <van-cell-group inset title="项目管理">
        <van-cell title="中心管理" is-link />
        <van-cell title="人员管理" is-link />
        <van-cell title="预算管理" is-link />
        <van-cell title="费用管理" is-link />
      </van-cell-group>
      <van-cell-group inset title="中心业务">
        <van-cell title="受试者管理" is-link />
        <van-cell title="访试管理" is-link />
        <van-cell title="入组周报" is-link />
        <van-cell title="临床监察" is-link />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script setup>
import { provide, defineProps, ref } from "vue";
const showPopup = ref(false);
const props = defineProps({
  projectId: String,
  detail: Object,
  menu: Array,
  mem: Array,
  center: Array,
});
provide("project", props.detail);
provide("projectId", props.projectId);
provide("menu", props.menu);
provide("mem", props.mem);
provide("center", props.center);
</script>

<style>
</style>