<!--人员详情-->
<template>
  <van-dialog 
    v-model:show="dialogVisible" 
    show-cancel-button 
    @closed="closed"
    :closeOnClickOverlay="true"
    :showConfirmButton="false"
    :showCancelButton="false"
  >
    <van-cell-group>
      <van-cell title="姓名" :value="data.realName"/>
      <van-cell title="项目职位" :value="data.userRoleName"/>
      <van-cell title="联系电话" :value="$filter.encryptionPhone(data.phone)">
        <template #right-icon>
          <van-button tag="a" :href="`tel:${data.phone}`" size="small" icon="phone-o"></van-button>
        </template>
      </van-cell>
      <van-cell title="上一次登录" :value="data.lastLoginTime.split(' ').shift()"/>
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
