<script setup>
import { defineProps, toRef, toRefs , onMounted, computed, watchEffect, watch } from "vue";
import { ImagePreview } from 'vant';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useDirectory, useDocList, useDocItem, useUpload } from "@/service/project/doc";
import File from "@/components/common/File";
import { isPicture } from '@/util/whatIsThat'

const props = defineProps({
  projectId: String,
  id: String,
});

const load = async () => {
  getDocList(props.id);
}

const route = useRoute()
const store = useStore()
const { confirmDirectory } = useDirectory()
const { getDocList, loading, directory, docList } = useDocList();
const { onSelect, showActionBar, actions } = useDocItem(load);
const { upload } = useUpload(directory)  

const afterRead = async (file) => {
  try {
    await upload(file)
    load()
  }catch(err){
    console.log(err)
  }
}

const images = computed(() => {
  return docList.value
    .map(item => item.fileLocation)
    .filter(item => isPicture(item))
})

const buttons = computed(() => {
  return directory.buttons || []
})

const notice = computed(() => {
  const result = []
  if(directory.isRequired) {
    result.push('当前需要上传文件')
  }
  if(directory.isNeedApprove){
    result.push('文件需要审批')
  }
  return result.join(' , ')
})

const getAuditStatusType = type => {
  //审批状态：0->未审批、1->正在审核、2->驳回、3->通过
  const mapping = {
    0: 'default',
    1: 'warning',
    2: 'danger',
    3: 'success'
  }
  return mapping[type] || ''
}

const getStatusType = type => {
  const mapping = {
    '草稿': 'default',
    '已归档': 'success'
  }
  return mapping[type] || ''
}

const showImages = item => {
  ImagePreview({
    images: images.value,
    startPosition: images.value.findIndex(link => link == item),
  });
}

watch(directory, (val) => {
  const name = val.directoryParents.at(-1).name
  store.commit('SET_TITLE', name)
})

onMounted(load);
</script>


<template>
  <div>
    <van-notice-bar v-if="notice" left-icon="info-o" :text="notice">
    </van-notice-bar>
    <div v-if="loading" class="text-center py-6">
      <van-loading />
    </div>
    <van-empty v-else-if="docList.length == 0" description="暂无信息" />
    <van-cell-group v-else>
      <van-cell
        v-for="item in docList"
        :key="item.id"
        size="large"
        clickable
        :title-style="{
          width: '0 !important',
          overflow: 'hidden',
          'padding-left': '5px',
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
          <p class="truncate">
            {{ item.name }}
          </p>
        </template>
        <template #label class="text-xs">
          <span class="mr-2">版本: {{ item.version }}</span>
          <span>{{ item.uploadTime }}</span>
        </template>
        <template #value>
          <span v-if="directory.isNeedApprove" class="mr-1">
            <van-tag :type="getAuditStatusType(item.auditStatus)">{{ item.fileAuditStatus }}</van-tag>
          </span>
          <van-tag :type="getStatusType(item.fileStatus)">{{ item.fileStatus }}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <div style="height: 50px">
      <van-action-bar>
        <van-action-bar-button v-if="buttons.includes('confirm')" type="success" text="确认完成" @click="confirmDirectory(directory)"/>
        <van-uploader 
          v-if="buttons.includes('upload_file')" 
          class="btn-uploader"
          :after-read="afterRead"
          capture="camera"
          >
          <van-action-bar-button type="primary" text="上传文件" />
        </van-uploader>   
      </van-action-bar>
    </div>

    <van-action-sheet
      v-model:show="showActionBar"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<style lang="less" scoped>
.btn-uploader ::v-deep{
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