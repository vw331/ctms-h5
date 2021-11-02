<template>
  <div class="about">
    <button @click="propmt">popmpt</button>
  </div>
</template>

<script>
import myDialog from '@/components/common/MyDialog'

export default {
  setup() {
    
  },
  created() { 
  },
  methods: {
    async propmt() {
      const result = await myDialog({
        title: '修改文件名称',
        defaultValue: '申请书.jpg'
      })
      console.log(result)
    }    
  }
}
</script>
