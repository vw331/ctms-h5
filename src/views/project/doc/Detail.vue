<script setup>
import { defineProps, ref, onMounted, computed } from "vue";
import { ImagePreview } from 'vant';
import { useDocList, useDocItem, useUpload } from "@/service/project/doc";
import File from "@/components/common/File";
import { isPicture } from '@/util/whatIsThat'

const props = defineProps({
  projectId: String,
  id: String,
});

const data = ref([]);
const images = computed(() => {
  return data.value
    .map(item => item.fileLocation)
    .filter(item => isPicture(item))
})

const load = async () => {
  data.value = await getDocList({
    projectId: props.projectId,
    parentId: props.id,
  });
}

const { getDocList, loading } = useDocList();
const { onSelect, actions, showActionBar, pictureLink, showPicturePopup } = useDocItem();
const { upload } = useUpload({ id: props.id })  

const afterRead = async (file) => {
  await upload(file)
  load()
}

const showImages = item => {
  ImagePreview({
    images: images.value,
    startPosition: images.value.findIndex(link => link == item),
  });
}

onMounted(load);
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
          <file 
            v-if="!isPicture(item.fileLocation)" 
            size="42px"
            :link="item.fileLocation"></file>
          <van-image
            v-else
            width="42px"
            height="42px"
            fit="fill"
            :src="item.fileLocation"
            @click.stop="showImages(item.fileLocation)"
          />
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
      <van-uploader 
        class="btn-uploader"
        :after-read="afterRead" 
        multiple 
        >
         <van-action-bar-button type="primary" text="上传文件" />
       </van-uploader>   
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

<style lang="less" scoped>
/deep/.btn-uploader {
  flex: 1;
  .van-uploader__wrapper {
    width: 100%
  }
  .van-uploader__input-wrapper {
    display: flex;
    width: 100%
  }
}
</style>