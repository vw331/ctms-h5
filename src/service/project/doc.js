import request from '@/core/axios'
import { ref, toRefs, reactive, computed, inject } from 'vue'
import myDialog from '@/components/common/MyDialog'
import { Toast, Notify  } from 'vant';

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
  const rename = async file => {
    const name = file.file.value.name
    const justName = name.split('.').shift()
    try {
      alert(justName)
      const res = await myDialog({
        title: '将文件重命名',
        placeholder: '请输入文件名称',
        defaultValue: '',
        describe: `${justName}`
      })
      const newName = name.replace(justName, res)
      const newFile = new File([file.file.value], newName, {
        type: file.file.value.type
      })
      alert(`newFile: ${newFile.name}`)
      return newFile
    }catch(err) {
      return file
    }
  }

  // 上传文件
  const upload = async files => {
    const refFiles = toRefs(files)
    const newFiles = await rename(refFiles)
    alert(newFiles)
    try {
      Toast.loading({
        message: '正在上传...',
        forbidClick: true,
      });
      const formData = new FormData()
      formData.append('file', newFiles)
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
      if(success) {
        console.log('success')
      }
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