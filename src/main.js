import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vantComponents from '@/core/vant'
import { injection } from '@/mixin'

import '@/style/styles.css'

import request, {setRequestToken} from '@/core/axios'

const app = createApp({
  ...App,
  mixins: [injection],
  watch: {
    '$store.state.user.token': {
      immediate: true,
      handler(val) {
        if(val) {
          setRequestToken(val)
        }else {
          router.push({name: 'Login'})
        }
      }
    }
  }
})

app.use(store)
  .use(router)
  .use(vantComponents)
  .mount('#app')

app  

app.config.globalProperties.foo = 'bar'
app.config.globalProperties.$http = request