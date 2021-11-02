<template>
  <van-dialog 
    v-model:show="dialogVisible" 
    :title="title" 
    show-cancel-button 
    @confirm="confirm"
    @closed="closed"
    :before-close="beforeClose"
    >
    <van-form ref="form" @submit="submit">
      <van-cell-group inset :title="describe">
        <van-field
          ref="field"
          v-model="name"
          autofocus
          :placeholder='placeholder'
          name="text"
          :rules="[{ required: true, message: '必填项' }]"
          clearable
        />
      </van-cell-group>
    </van-form>
  </van-dialog>
</template>

<script>
import { Dialog } from 'vant'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    placeholder: {
      type: String,
      default: '提示信息'
    },
    describe: String,
    defaultValue: String,
    success: {
      type: Function
    },
    closed: {
      type: Function
    },
  },
  data(){
    return {
      name: this.defaultValue,
      dialogVisible: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.dialogVisible = true
    })
  },
  methods: {
    confirm() {
      this.$refs.form.submit()
    },
    submit(form) {
      this.success(form.text)
      this.dialogVisible = false
    },
    beforeClose (action) {
      if(action == 'confirm') return false
      return true
    }
  }
}
</script>

<style>

</style>
