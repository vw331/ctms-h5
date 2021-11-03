import { createApp } from 'vue'
import { useRoute } from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'
import vantComponents from '@/core/vant'
import { injection } from '@/mixin'

import '@/style/styles.css'
import '@/style/root.css'

import request, { setRequestToken } from '@/core/axios'

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
    '$store.state.system.title': {
      handler(val) {
        document.title = val
      }
    }
  }
})

app.use(store)
  .use(router)
  .use(vantComponents)
  .mount('#app')

app.config.globalProperties.$title = document.title
app.config.globalProperties.$http = request