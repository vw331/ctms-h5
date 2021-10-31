<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useDocList, useDocItem } from "@/service/project/doc";
import File from "@/components/common/File";

const props = defineProps({
  projectId: String,
  id: String,
});

const { getDocList, loading } = useDocList();
const { onSelect, actions, showActionBar, pictureLink, showPicturePopup } =
  useDocItem();

const data = ref([]);

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
        @click="onSelect(item)"
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
      v-model:show="showActionBar"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
    />

    <van-popup
      v-model:show="showPicturePopup"
      closeable
      :style="{ width: '100%' }"
    >
      <img :src="pictureLink" alt="" />
    </van-popup>
  </div>
</template>

<style>
</style>