<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useProcess } from "@/service/project";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const data = ref([]);

const { getProcessList } = useProcess();

onMounted(async () => {
  data.value = await getProcessList(props.projectId);
});
</script>


<template>
  <van-steps direction="vertical" :active="5">
    <van-step v-for="item in data" :key="item.id">
      <h3 class="text-md">{{ item.action }}</h3>
      <p class="text-sm">
        <span v-if="item.status == 'finished'">{{ item.actualEndDt }}结束</span>
        <span v-else-if="item.status == 'processing'">
          {{ item.planStartDt }}计划开始
        </span>
      </p>
    </van-step>
  </van-steps>
</template>

<style>
</style>