<script setup>
import { defineProps } from "vue";
const props = defineProps({
  center: {
    type: Array,
    required: true,
  },
});
</script>


<template>
  <van-cell-group>
    <van-cell
      v-for="item in props.center"
      class="flex-wrap"
      :key="item.id"
      :title="item.centerName"
      size="large"
      value="合同签署"
      label="当前入组: 45人"
      is-link
      clickable
    >
      <template #extra>
        <div class="w-full py-2">
          <van-progress :percentage="50" />
        </div>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style>
</style>