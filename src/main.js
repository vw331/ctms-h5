import { createApp } from 'vue'
import { useRoute } from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'
import vantComponents from '@/core/vant'
import { injection } from '@/mixin'
import * as $filters from '@/util/filter'
import '@/style/styles.css'
import '@/style/root.css'

import request, { setRequestToken } from '@/core/axios'
import { useRefreshToken } from '@/service/system' 

const app = createApp({
  ...App,
  mixins: [injection],
  watch: {
    '$store.state.user.token': {
      immediate: true,
      handler(val, oldVal) {
        if (val) {
          setRequestToken(val)
        }
      }
    },
    '$store.state.user.userInfo': {
      handler(val) {
        if(val && Object.hasOwn(val, 'refreshToken')){
          useRefreshToken()
        }
      }
    },
    '$store.state.system.title': {
      handler(val) {
        document.title = val
      }
    }
  }
})

app.config.globalProperties.$title = document.title
app.config.globalProperties.$http = request
app.config.globalProperties.$filter = Object.keys($filters).reduce((curr, key) => {
  curr[key] = $filters[key];
  return curr 
}, {})

app.use(store)
  .use(router)
  .use(vantComponents)
  .mount('#app')
