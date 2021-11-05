<script setup>
import { computed, defineProps, ref } from "vue";
import ViewMem from '@/components/project/ViewMem'
import myDialog from '@/components/common/MyDialog'
const props = defineProps({
  mem: {
    type: Array,
    required: true,
  },
  center: {
    type: Array,
    required: true
  }
});

const globalMem = computed(() => {
  return props.mem.filter(item => ['PM'].includes(item.userRole))
})

const centerMem = computed(() => {
  return props.mem.filter(item => !['PM'].includes(item.userRole))
})

const groupByCenter = computed(() => {
  return props.center.map(item => {
    const currentMem = centerMem.value.filter(mem => mem?.authCenterIdList?.includes(item.id))
    return {
      id: item.id,
      name: item.centerName,
      mem: currentMem
    }
  })
})

const showPopup = item => {
  myDialog(ViewMem, {
    data: item
  })
}
</script>


<template>
  <van-cell-group>
    <van-cell
      v-for="item in globalMem"
      class="flex-wrap"
      :key="item.id"
      :title="item.realName"
      size="large"
      :label="`最近登录: ${item?.lastLoginTime.split(' ').at(0)}`"
      :value="item.userRoleName"
      is-link
      clickable
      @click="showPopup(item)"
    >
    </van-cell>
  </van-cell-group>
  <van-cell-group v-for="center in groupByCenter" :key="center.id" :title="center.name">
    <van-cell
        v-for="mem in center.mem" 
        :key="mem.id" 
        :title="mem.realName" 
        :value="mem.userRoleName"
        size="large"
        :label="`最近登录: ${mem?.lastLoginTime.split(' ').at(0)}`"
        is-link
        clickable
        @click="showPopup(mem)"
      ></van-cell>
  </van-cell-group>
</template>

<style>
</style>