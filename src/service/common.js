import request from '@/core/axios'
import { ref } from 'vue'
/**
 * 用户消息
 */
export const useMessage = () => {
  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);
  const refreshing = ref(false);
  const error = ref(false);
  const status = 0
  const size = 20
  let current = 0

  const getMessage = async (params) => {
    try {
      //loading.value = false
      const data = await request({
        method: 'get',
        url: '/api/ctms/index/notice/list',
        params
      })
      return data.data
    }catch(err) {
      console.log(err)
    }finally {
      //loading.value = false
    }
    
  }

  const onLoad = async () => {
    
    try {
      current ++
      const data = await getMessage({ status, current, size })
      if (refreshing.value) {
        list.value = [];
        refreshing.value = false;
      }
      const { records, total } = data
      list.value = list.value.concat(records)
      finished.value = list.value.length == total
    }catch(err) {
      error.value = error
    }finally {
      loading.value = false
    }
   
  }

  const onRefresh = () => {
    // 清空列表数据
    finished.value = false;
    current = 0
    loading.value = true;
    onLoad();
  };

  return {
    list,
    loading,
    finished,
    refreshing,
    error,
    onRefresh,
    onLoad
  }
}

/**
 * 日历
 * @returns 
 */
export const useCalendar = () => {

  const getToDoList = async params => {
    try {
      const data = await request('/api/ctms/index/calendar/list', {
        params
      })
      return data
    }catch(err) {
      console.log(err)
    }
  }

  return {
    getToDoList
  }
}