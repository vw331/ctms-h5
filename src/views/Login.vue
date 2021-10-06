<template>
  <div class="h-screen flex flex-col justify-center ">
    <h3 class="text-xl p-4">CTMS 登录</h3>
    <div>
      <van-form
        @submit="login">
        <van-cell-group inset>
          <van-field
            autofocus
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="captchaCode"
            type="text"
            name="captchaCode"
            label="验证码"
            placeholder="验证证"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <img @click="getCaptchaImg" style="height:  var(--van-button-small-height);" :src="captchaImg">
            </template>
          </van-field>
          <van-field class="hidden" type="hidden" name="captchaKey" v-model="captchaKey"/>
          <van-field class="hidden" type="hidden" name="tenantId" v-model="tenantId"/>
          <van-field class="hidden" type="hidden" name="grant_type" v-model="grant_type"/>
          <van-field class="hidden" type="hidden" name="scope" v-model="scope"/>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button :loading="loginLoading" round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useCaptchaImg, useLogin } from '@/service/system'
import { useRouter } from 'vue-router'
import {debounce} from 'lodash'

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const captchaCode = ref('');
    const { captchaImg, captchaKey, getCaptchaImg } = useCaptchaImg()
    const router = useRouter()
    
    const loadingSuccess = debounce(() => {
      router.push('/')
    }, 2000)

    const { login, loginLoading } = useLogin(loadingSuccess)

    onMounted(() => {
      getCaptchaImg()
    })

    return {
      login,
      loginLoading,
      captchaKey,
      captchaImg,
      username,
      password,
      captchaCode,
      getCaptchaImg
    };
  },
  data() {
    return {
      tenantId: '000000',
      grant_type: 'captcha',
      scope: 'all'
    }
  }
}
</script>

<style>

</style>