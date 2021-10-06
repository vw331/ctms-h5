import request from '@/core/axios'
import { ref } from 'vue'
/**
 * 用户消息
 */
export const useMessage = () => {
  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);
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

  const load = async () => {
    current ++
    const data = await getMessage({ status, current, size })
    const { records, total } = data
    list.value = list.value.concat(records)
    loading.value = false
    finished.value = list.value.length == total
  }


  return {
    load,
    list,
    loading,
    finished
  }
}