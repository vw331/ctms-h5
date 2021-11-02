<!--me-->
<template>
  <div v-if="userInfo">
    <div class="bg-blue-600 text-white p-4">
      <div class="flex flex-row items-center my-4">
        <van-image
          round
          width="4rem"
          height="4rem"
          :src="userInfo.avatar"
        />
        <div class="p-2 flex-1">
          <p class="text-lg">{{userInfo.name}}</p>
          <p class="text-xs">{{userInfo.phone}}</p>
        </div>
      </div>
    </div>

    <van-cell-group>
      <van-cell title="单位" :value="userInfo.deptName" />
      <van-cell title="邮箱" :value="userInfo.email" />
      <van-cell title="职位" :value="userInfo.postName" />
      <van-cell title="上一次登录" :value="userInfo.lastLoginTime" />
      <van-cell title="关于我们" is-link to="/about" />
    </van-cell-group>

    <van-cell-group title='' class="mt-4">
      <van-cell class="text-center" @click="handleLogout">
        <template #title>
          <van-loading v-if="logoutLoading" size="24px">正在登出...</van-loading>
          <span v-else class="text-red-400">退出登录</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useLogout } from '@/service/system'

export default {
  setup() {
    const store = useStore()
    const { logoutLoading, logout } = useLogout()

    const handleLogout = async () => {
      await Dialog.confirm({
        title: '提示',
        message: '确认要退出系统？',
      })
      await logout()
    }

    return {
      userInfo: computed(() => store.getters.userInfo),
      handleLogout,
      logoutLoading,
      logout
    }
  },
  methods: {
  }
}
</script>

<style>

</style>