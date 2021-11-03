import request from '@/core/axios'
import { ref, toRefs, toRef, reactive, computed, inject } from 'vue'
import myDialog from '@/components/common/MyDialog'
import { Toast, Notify  } from 'vant';
import Compressor from 'compressorjs';

// 文档类别
export const useCategory = () => {
  const loading = ref(false)

  const categoryList = ref([])

  const getCategory = async (projectId) => {
    try {
      loading.value = true
      const res = await request(`/api/ctms/project/v2/directory/${projectId}/root/list`)
      const {success, msg, data} = res
      if(!success) throw msg
      categoryList.value = data
      return res.data
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    categoryList,
    getCategory,
    loading
  }
}

// 文件夹
export const useCatalogue = () => {
  const loading = ref(false)
  const catalogueList = ref([])
  // 文件夹列表
  const getCatalogueList = async params => {
    try {
      loading.value = true
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/directory/${params.id}/list`,
        params
      })
      const { data, success, msg } = res
      if (!success) throw msg
      catalogueList.value = data
      return data
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    getCatalogueList,
    catalogueList,
    loading
  }
}

// 文件列表
export const useDocList = () => {
  const loading = ref(false)
  const directory = ref({})
  const docList = ref([])
  const getDocList = async directoryId => {
    try {
      loading.value = true
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/directory/${directoryId}`,
      })
      const { data, success, msg } = res
      if (!success) throw msg
      directory.value = data
      docList.value = data.docList
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    directory,
    docList,
    getDocList
  }
}

// 文件详情
export const useDocItem = () => {

  const activeItem = reactive({})
  const showActionBar = ref(false)
  const showPicturePopup = ref(false)
  const pictureLink = ref('')
  const isMiniprogram = inject('isMiniprogram')

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
      if(isMiniprogram.value) {
        window.wx.openUrl({ url: fileLocation } )
      }else {
        window.open(fileLocation, '_blank')
      }
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

export const useUpload = (directory) => {
  
  const loading = ref(false)
  
  // 给文件重命名
  const rename = async originName => {
    const [name, suffix] = originName.split('.')
    try {
      const newName = await myDialog({
        title: '将文件重命名',
        placeholder: '请输入文件名称',
        defaultValue: name,
        describe: `${originName}`
      })
      return [newName, suffix].join('.')
    }catch(err) {
      return originName
    }
  }

  // 上传文件
  const upload = async files => {
    const refFiles = toRef(files, 'file')
    const { name } = refFiles.value
    const newName = await rename(name)
    try {
      Toast.loading({
        message: '正在上传...',
        forbidClick: true,
        duration: 0
      });
      // 压缩图片
      const newFile = await new Promise((resolve, reject) => {
        new Compressor(refFiles.value, {
          maxWidth: 4096,
          maxHeight: 4096,
          success: resolve,
          error: reject,
        })
      })
      const formData = new FormData()
      formData.append('file', newFile, newName)
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/upload/${directory.id}`,
        method: 'post',
        headers: {
         'Content-Type': 'multipart/form-data',
        },
        data: formData
      })
      const {success, msg} = res
      Notify({ 
        type: success ? 'success': 'danger', 
        message: msg 
      });
      if(!success) throw msg
    }catch(err){
      console.log(err)
    }finally {
      Toast.clear()
    }
  }

  return {
    loading,
    upload
  }
}