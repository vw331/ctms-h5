import request from '@/core/axios'
import { ref } from 'vue'

// 文档类别
export const useCategory = () => {
  const loading = ref(false)
  const getCategory = async (projectId) => {
    try {
      loading.value = true
      const res = await request(`/api/ctms/project/v2/directory/${projectId}/root/list`)
      return res.data
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    getCategory,
    loading
  }
}

// 文件夹列表
export const useCatalogue = () => {
  const loading = ref(false)
  const getCatalogue = async params => {
    try {
      loading.value = true
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/directory/${params.id}/list`,
        params
      })
      const { data, success, msg } = res
      if (!success) throw msg
      return data
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    getCatalogue,
    loading
  }
}

export const useDocList = () => {
  const loading = ref(false)
  const getDocList = async params => {
    try {
      loading.value = true
      const res = await request({
        url: `/api/ctms/project/v2/directory/list`,
        params
      })
      const { data, success, msg } = res
      if (!success) throw msg
      return data
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getDocList
  }
}