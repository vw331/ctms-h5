<script setup>
import { defineProps } from "vue";
const props = defineProps({
  mem: {
    type: Array,
    required: true,
  },
});
</script>


<template>
  <van-cell-group>
    <van-cell
      v-for="item in props.mem"
      class="flex-wrap"
      :key="item.id"
      :value="item.realName"
      size="large"
      :label="`最近登录: ${item?.lastLoginTime.split(' ').at(0)}`"
      :title="item.userRoleName"
      is-link
      clickable
    >
    </van-cell>
  </van-cell-group>
</template>

<style>
</style>