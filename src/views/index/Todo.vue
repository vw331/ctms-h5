<!--待办事项-->
<script setup>
//import { ref } from 'vue'

import { useCalendar } from '@/service/common'

const { getToDoList } = useCalendar()

const formatter = (day) => {
  return {
    ...day,
    bottomInfo: '2'
  }
}
</script>

<template>
  <div>
    <van-calendar
      title="日历"
      :show-title="false"
      :show-subtitle="false"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '400px' }"
      :formatter="formatter"
      @month-show="getToDoList"
    />
  </div>
</template>

<style>

</style>