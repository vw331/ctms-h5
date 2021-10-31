<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useDocList } from "@/service/project/doc";
import File from "@/components/common/File";

const props = defineProps({
  projectId: String,
  id: String,
});

const { getDocList, loading } = useDocList();
const data = ref([]);
const showActionSheet = ref(false);
const actions = [
  { name: "预览" },
  { name: "下载" },
  { name: "重命名" },
  { name: "删除" },
  { name: "提交审核" },
  { name: "归档" },
];

const onClick = (item) => {
  console.log(item);
  showActionSheet.value = true;
};

const onSelect = (item) => {
  console.log(item);
};

onMounted(async () => {
  data.value = await getDocList({
    projectId: props.projectId,
    parentId: props.id,
  });
});
</script>


<template>
  <div>
    <div v-if="loading" class="text-center py-6">
      <van-loading />
    </div>
    <van-empty v-else-if="data.length == 0" description="暂无信息" />
    <van-cell-group v-else>
      <van-cell
        v-for="item in data"
        :key="item.id"
        size="large"
        clickable
        :title-style="{
          width: '0 !important',
          overflow: 'hidden',
          flex: 2,
        }"
        @click="onClick(item)"
      >
        <template #icon>
          <file :link="item.fileLocation"></file>
        </template>
        <template #title>
          <p class="truncate pl-2">
            {{ item.name }}
          </p>
        </template>
        <template #label>
          <span>{{ item.detail.auditStatusDesc }}</span>
        </template>
        <template #value>
          <van-tag>{{ item.detail.fileStatusDesc }}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <van-action-bar>
      <van-action-bar-button type="success" text="确认完成" />
      <van-action-bar-button type="primary" text="上传文件" />
    </van-action-bar>

    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<style>
</style>