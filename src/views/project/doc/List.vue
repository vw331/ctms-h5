<script setup>
import { inject, ref, onMounted, computed, watch } from "vue";
import Folder from "@/components/common/Folder";
import { useCategory, useCatalogue } from "@/service/project/doc";

const projectId = inject("projectId");
const categorySelected = ref("");
const statusSelected = ref("");

const statusOption = [
  { text: "全部", value: "" },
  { text: "待上传", value: "待上传" },
  { text: "进行中", value: "进行中" },
  { text: "已完成", value: "已完成" },
];

const { getCategory, categoryList } = useCategory();
const { getCatalogueList, catalogueList, loading } = useCatalogue();

const load = () => {
  
};

const categoryOption = computed(() => {
  return categoryList.value?.map(item => ({
    text: item.name,
    value: item.id
  }))
})

watch([categorySelected, statusSelected], ([category, status]) => {
  getCatalogueList({
    id: category,
    status,
  });
})

onMounted(async () => {
  await getCategory(projectId);
  categorySelected.value = categoryList.value.at(0)?.id
});
</script>

<template>
  <div class="relative">
    <van-dropdown-menu>
      <van-dropdown-item
        @change="load"
        v-model="categorySelected"
        :options="categoryOption"
      />
      <van-dropdown-item
        @change="load"
        v-model="statusSelected"
        :options="statusOption"
      />
    </van-dropdown-menu>
    <div v-if="loading" class="text-center py-6">
      <van-loading />
    </div>
    <van-empty v-else-if="catalogueList.length == 0" description="暂无信息" />
    <van-cell-group v-else>
      <van-cell
        v-for="item in catalogueList"
        :key="item.id"
        :required="item.isRequired"
        size="large"
        :title-style="{
          width: '0 !important',
          overflow: 'hidden',
          flex: 2,
        }"
        is-link
        :to="{ name: 'projectDocFolder', params: { projectId, id: item.id } }"
      >
        <template #icon>
          <folder :isEmpty="item.docList.length == 0"></folder>
        </template>
        <template #title>
          <p class="truncate pl-2">
            {{ item.directoryPath.split("->").pop() }}
          </p>
        </template>
        <template #label>
          <span v-if="item.docList.length"
            >{{ item.docList.length }} 个文件</span
          >
          <span v-if="item.isNeedApprove">需要审批</span>
        </template>
        <template #value>
          <van-tag v-if="item.status == '待上传'" type="warning"
            >待上传</van-tag
          >
          <van-tag v-else-if="item.status == '进行中'" type="primary"
            >进行中</van-tag
          >
          <van-tag v-else-if="item.status == '已完成'" type="success"
            >已完成</van-tag
          >
          <van-tag v-else type="danger">{{ item.status }}</van-tag>
        </template>
        <template #extra>
          <div v-if="item.remark" class="w-full text-xs">{{ item.remark }}</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style>
</style>