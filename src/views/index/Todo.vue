<!--待办事项-->
<script setup>
import { ref, computed, reactive } from 'vue'
import { useCalendar } from '@/service/common'
import dayjs from 'dayjs'

const { getToDoList } = useCalendar()

const calendar = ref(null)
const dataSet = ref([])
const selectDay = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const todoList = computed(() => {
  return dataSet.value.find(item => dayjs(item.date).format('YYYY-MM-DD') == selectDay.value) || {}
})

const formatter = computed(() => {
  return day => {
    const dayString = dayjs(day.date).format('YYYY-MM-DD')
    const result = dataSet.value.find(item => item.date == dayString)
    if(result) {
      day.bottomInfo = result.info
      day.className = 'we_have_job'
    }
    return day
  } 
})

const monthShow = async ({date}) => {
  const [year, month] = [date.getFullYear(), date.getMonth() + 1]
  const {data} = await getToDoList({ year, month})
  
  data.forEach(day => {
    const { date, planList } = day
    day.info = planList.flatMap(plan => plan.description).length ? '有任务' : ''
    dataSet.value.push(day)
  })
}

const select = day => {
  selectDay.value = dayjs(day).format('YYYY-MM-DD')
}

const getPlanStyle = type => {
  const mapping = {
    '项目时间计划': 'red',
    '项目入组计划': 'blue',
    '中心入组计划': 'green',
  }
  return `border-l-4 border-${mapping[type]}-500`
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
      :style="{ height: '350px' }"
      :formatter="formatter"
      @month-show="monthShow"
      @select="select"
    />
  </div>
  <div v-if="todoList.planList">
    <van-empty v-if="todoList.planList.length == 0" image-size="64" description="今日暂无任务" />
    <van-cell-group v-else v-for="plan in todoList?.planList" :key="plan.type" :title="plan.type">
      <van-cell :class="getPlanStyle(plan.type)" v-for="(job, index) in plan.description" :key="index" title-class="flex-auto" :title="job"  />
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
::v-deep .we_have_job {
  .van-calendar__bottom-info {
    text-indent: -999em;
    display: block;
    width: 6px;
    height: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: #0084ff;
  }
}
</style>