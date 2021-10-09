<!--待办事项-->
<script setup>
import { ref, computed, reactive } from 'vue'
import { useCalendar } from '@/service/common'
import dayjs from 'dayjs'

const { getToDoList } = useCalendar()

const days = []
const selectDay = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const todoList = computed(() => {
  return days.find(item => dayjs(item.date).format('YYYY-MM-DD') == selectDay.value)
})

const formatter = day => {
  const $day = reactive(day)
  days.push($day)
  return $day
}

const monthShow = async ({date}) => {
  const [year, month] = [date.getFullYear(), date.getMonth() + 1]
  const {data} = await getToDoList({ year, month})
  data.forEach(day => {
    const { date, planList } = day
    const thisDay = days.find(item => dayjs(item.date).format('YYYY-MM-DD') == date)
    thisDay.planList = planList
    thisDay.bottomInfo = planList.flatMap(plan => plan.description).length ? '任务' : ''
  })
}




</script>

<template>
  <div>
    <van-calendar
      ref="calendar"
      title="日历"
      :show-title="false"
      :show-subtitle="false"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '400px' }"
      :formatter="formatter"
      @month-show="monthShow"
    />
  </div>
  <div>
    {{ todoList }}
  </div>
</template>

<style>

</style>