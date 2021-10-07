import request from '@/core/axios'
import { ref } from 'vue'

export const useProject = () => {

  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);
  const refreshing = ref(false);
  const error = ref(false);
  const size = 20
  let current = 0

  const getProjectList = async (params) => {

    try {
      const data = await request('/api/ctms/project/list', {
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
    console.log('onload')
    try {
      current ++
      const data = await getProjectList({ current, size })
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
    loading,
    list,
    onLoad,
    finished,
    refreshing,
    onRefresh,
    getProjectList
  }

}