import request from '@/core/axios'
import { ref, toRefs, toRef, reactive, computed, inject } from 'vue'
import myDialog from '@/components/common/MyDialog'
import EditFile from '@/components/project/file/EditFile'
import ViewFile from '@/components/project/file/ViewFile'
import { Toast, Notify, Dialog  } from 'vant';
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
export const useDirectory = () => {
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

  // 确认完成
  const confirmDirectory = async directory => {
    try {
      const { docNum } = directory
      let message = ''
      if(docNum.length == 0) {
        message = '当前文件夹没有文件，确认已经完成了？'
      }else {
        message = '确认已经完成了？'
      }
      await Dialog.confirm({
        title: '提醒',
        message
      })
    }catch(err) {
      console.log(err)
    }
  }

  return {
    getCatalogueList,
    catalogueList,
    confirmDirectory,
    loading
  }
}

// 文件列表
export const useDocList = () => {
  const loading = ref(false)
  const directory = reactive({})
  const docList = ref([])
  const getDocList = async directoryId => {
    try {
      loading.value = true
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/directory/${directoryId}`,
      })
      const { data, success, msg } = res
      if (!success) throw msg
      Object.assign(directory, data)
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
export const useDocItem = (reload) => {

  const activeItem = reactive({})
  const showActionBar = ref(false)
  const isMiniprogram = inject('isMiniprogram')

  const download = () => {
    console.log(activeItem)
  }

  // 查看
  const view = () => {
    myDialog(ViewFile, { data: activeItem })
  }

  // 删除图片
  const deleteFile = async () => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: `确认要删除${activeItem.name}?`,
      })
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/${activeItem.id}`,
        method: 'DELETE'
      })
      const { msg, success } = res
      Notify({
        type: success ? 'success': 'error',
        message: msg
      })
      if(success) reload()
    }catch(err){
      console.error(err)
    }
  }

  // 修改
  const edit = async () => {
    try {
      const name = activeItem.name
      const resName = await myDialog(EditFile, {
        defaultValue: {
          name,
          version: activeItem.version
        },
      })
      const res = await request({
        url: `/api/ctms/project/v2/my/doc`,
        method: 'put',
        data: {
          fileName: resName.name,
          fileVersion: resName.version,
          id: activeItem.id
        }
      })
      const { msg, success } = res
      Notify({
        type: success ? 'success': 'error',
        message: msg
      })
      if(success) reload()
    }catch(err) {
      console.log(err)
    }
  }

  // 归档
  const archive = async () => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: `确认要将 ${activeItem.name} 归档?`,
      })
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/${activeItem.id}/archive`,
        method: 'put'
      })
      const { msg, success } = res
      Notify({
        type: success ? 'success': 'error',
        message: msg
      })
      if(success) reload()
    }catch(err){
      console.log(err)
    }
  }

  // 选中
  const onSelect = item => {
    Object.assign(activeItem, item)
    showActionBar.value = true
  }

  const actions = computed(() => {
    const buttons = activeItem.buttons || []
    const result = [
      { name: "详情", callback: view }, 
      { name: "下载", callback: download }
    ]
    if(buttons.includes('edit')) result.push({ name: "修改", callback: edit }) 
    if(buttons.includes('archive')) result.push({ name: "归档",  callback: archive }) 
    if(buttons.includes('delete')) result.push({ name: "删除", color: '#ee0a24', callback: deleteFile })

    return result
  })

  return {
    onSelect,
    showActionBar,
    actions,
  }

}

export const useUpload = (directory) => {
  
  const loading = ref(false)
  
  // 给文件重命名
  const rename = async originName => {
    const { directoryParents, id, docNum } = directory
    const currentDirectory = directoryParents.at(-1).name
    const suffix = originName.split('.').at(-1)
    const defaultValue = `${currentDirectory}_${docNum+1}`
    try {
      const newName = await myDialog(undefined, {
        title: '将文件重命名',
        placeholder: '请输入文件名称',
        defaultValue,
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