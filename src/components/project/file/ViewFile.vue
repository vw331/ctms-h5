<template>
  <van-dialog 
    v-model:show="dialogVisible" 
    :title="data.name" 
    show-cancel-button 
    @closed="closed"
    :closeOnClickOverlay="true"
    :showConfirmButton="false"
    :showCancelButton="false"
  >
    <van-cell-group>
      <van-cell title="文件名" :value="data.name"/>
      <van-cell title="版本" :value="data.version"/>
      <van-cell title="状态" :value="data.fileStatus"/>
      <van-cell title="上传时间" :value="data.uploadTime"/>
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { Dialog } from 'vant'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {
    data: {
      type: Object
    },
    success: {
      type: Function
    },
    closed: {
      type: Function
    },
  },
  data(){
    return {
      dialogVisible: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.dialogVisible = true
    })
  }
}
</script>

<style>

</style>
