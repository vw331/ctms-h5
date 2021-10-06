<template>
  <div class="bg-gray-100 min-h-screen">
    <van-nav-bar
      fixed
      placeholder
      :title="title"
    />
    <router-view/>
    <van-tabbar placeholder route>
      <van-tabbar-item replace to="/projectList" icon="medal-o">项目</van-tabbar-item>
      <van-tabbar-item replace to="/todo" icon="todo-list-o">待办</van-tabbar-item>
      <van-tabbar-item replace to="/message" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const value = ref('1234')
    const active = ref(0)
    return {value, active}
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>
