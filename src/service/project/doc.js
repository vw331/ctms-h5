import request from '@/core/axios'
import { ref, reactive, computed } from 'vue'

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

// 文件列表
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

// 文件详情
export const useDocItem = () => {

  const activeItem = reactive({})
  const showActionBar = ref(false)
  const showPicturePopup = ref(false)
  const pictureLink = ref('')

  const download = () => {
    console.log(activeItem)
  }


  const viewFile = () => {
    const { fileLocation } = activeItem
    const type = fileLocation.split('/').pop().split('.').pop()
    if (['png', 'jpg', 'jpeg'].includes(type)) {
      showPicturePopup.value = true
      pictureLink.value = activeItem.fileLocation
    } else {
      window.open(fileLocation, '_blank')
    }
  }

  const onSelect = item => {
    Object.assign(activeItem, item)
    showActionBar.value = true
  }


  const actions = computed(() => {

    return [
      { name: "预览", callback: viewFile },
      { name: "下载", callback: download },
      { name: "重命名" },
      { name: "删除" },
      { name: "提交审核" },
      { name: "归档" }
    ]
  })

  return {
    onSelect,
    actions,
    showActionBar,
    showPicturePopup,
    pictureLink
  }

}