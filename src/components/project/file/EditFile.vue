<template>
  <van-dialog 
    v-model:show="dialogVisible" 
    title="修改文件信息" 
    show-cancel-button 
    @confirm="confirm"
    @closed="closed"
    :before-close="beforeClose"
    >
    <van-form ref="form" @submit="submit">
      <van-cell-group inset>
        <van-field
          label= '文件名称'
          v-model="name"
          autofocus
          placeholder='文件名称'
          name="name"
          required
          :rules="[{ required: true, message: '必填项' }]"
          clearable
        >
          <template #button>
            {{suffix}}
          </template>
        </van-field>
        <van-field
          label="当前版本"
          v-model="version"
          autofocus
          placeholder='文件版本'
          name="version"
          required
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
    defaultValue: {
      type: Object,
      default: () => {
        return {
          name: '',
          version: ''
        }
      }
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
      name: this.defaultValue.name.split('.').shift(),
      version: this.defaultValue.version,
      dialogVisible: false
    }
  },
  computed: {
    suffix(){
      return '.' + this.defaultValue.name.split('.').pop()
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
      this.success(form)
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
