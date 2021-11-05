import request from '@/core/axios'
import { ref, toRefs, toRef, reactive, computed, inject } from 'vue'
import myDialog from '@/components/common/MyDialog'
import EditFile from '@/components/project/file/EditFile'
import ViewFile from '@/components/project/file/ViewFile'
import { Toast, Notify, Dialog  } from 'vant';
import { downloadFile, useFileAgent } from '@/util/tools'
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
      const { id, docNum, isRequired } = directory
      let message, remark;
      if(docNum == 0) {
        if(isRequired) {
          message = '当前文件必须上传文件，若没有，请填写未上传的原因！'
        }else {
          message = '当前文件夹没有文件，确认已经完成了？'
        }
      }else {
        message = '确认已经完成了？'
      }
      if(isRequired) {
        remark = await myDialog(undefined, {
          title: '请填写原因',
          describe: message,
          placeholder: '请填写文件缺乏的原因'
        })
        console.log(remark)
      }else {
        await Dialog.confirm({
          title: '提醒',
          message
        })
      }
      const res = await request({
        url: `/api/ctms/project/v2/my/doc/directory/${id}/confirm`,
        method: 'put',
        params: {remark}
      })
      const { success, msg} = res
      Notify({
        type: success ? 'success' : 'error',
        message: msg
      })
      if(!success) throw msg
      return success     
    }catch(err) {
      console.log(err)
      return err
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
    const { fileLocation, name, version } = activeItem
    const realName = name.split('.').shift() + `_${version}`
    const agentFile = useFileAgent(fileLocation, realName)
    downloadFile(agentFile)
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
        url: `/api/ctms/project/v2/my/doc/archive`,
        method: 'put',
        data: { 
          docIds: [activeItem.id]
        }
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

  // 提交审批
  const approval = async () => {
    Dialog({message: '当前暂不支持，请前往web端操作'})
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
    if(buttons.includes('check')) result.push({ name: '提交审批', callback: approval})
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
    const { directoryParents, id, docNum, docList } = directory
    const currentDirectory = directoryParents.at(-1).name
    const suffix = originName.split('.').at(-1)
    const maxVersion = docList.map(item => item.version).sort().at(-1) || '1.0'
    const defaultName = `${currentDirectory}_${docNum+1}.${suffix}`
    try {
      const resName = await myDialog(EditFile, {
        defaultValue: {
          name: defaultName,
          version: maxVersion
        },
      })
      return {
        name: [resName.name, suffix].join('.'),
        version: resName.version
      }
    }catch(err) {
      throw new Error(err)
    }
  }

  // 上传文件
  const upload = async files => {
    const refFiles = toRef(files, 'file')
    try {
      const { name: originName } = refFiles.value
      const {name, version} = await rename(originName)
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
      formData.append('file', newFile, name)
      formData.append('version', version)
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
      throw Error(err)
    }finally {
      Toast.clear()
    }
  }

  return {
    loading,
    upload
  }
}