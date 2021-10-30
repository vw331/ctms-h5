import request from '@/core/axios'
import { ref } from 'vue'

// 项目列表
export const useProjectList = () => {

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
    } catch (err) {
      console.log(err)
    } finally {
      //loading.value = false
    }

  }

  const onLoad = async () => {
    console.log('onload')
    try {
      current++
      const data = await getProjectList({ current, size })
      if (refreshing.value) {
        list.value = [];
        refreshing.value = false;
      }
      const { records, total } = data
      list.value = list.value.concat(records)
      finished.value = list.value.length == total
    } catch (err) {
      error.value = error
    } finally {
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

// 获取所有信息
export const useAll = () => {

  const loading = ref(false)

  const getAll = async projectId => {
    try {
      loading.value = true
      const result = await Promise.all([
        request(`/api/ctms/project/detail?projectId=${projectId}`),
        request(`/api/ctms/project/menu?projectId=${projectId}`),
        request(`/api/ctms/project/mem/list?projectId=${projectId}&status=active`),
        request(`/api/ctms/project/hospital/list?projectId=${projectId}&size=1000&current=1&status=active`)
      ])
      return {
        detail: result[0].data,
        menu: result[1].data,
        mem: result[2].data,
        center: result[3].data.records
      }
    } catch (err) {
      throw '无权访问'
    } finally {
      loading.value = false
    }
  }

  return {
    getAll,
    loading
  }

}

// 项目信息
export const useProject = () => {

  const loading = ref(false)

  const getProject = async projectId => {
    try {
      loading.value = true
      const data = await request('/api/ctms/project/detail', {
        params: { projectId }
      })
      return data
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getProject
  }
}

// 项目进度
export const useProcess = () => {
  const loading = ref(false)
  const getProcessList = async projectId => {
    try {
      loading.value = true
      const res = await request({
        url: '/api/ctms/project/plan/list',
        params: {
          projectId,
          size: 999,
          current: 1
        }
      })
      const { records = [] } = res.data
      return records
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }
  return {
    getProcessList,
    loading
  }
}