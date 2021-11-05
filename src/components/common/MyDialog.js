import { createApp } from 'vue'
import { Button, CellGroup, Cell, Icon, Dialog, Form, Field } from 'vant';
import * as $filters from '@/util/filter'
import Prompt from './Prompt'

export default (dynamicComponent = Prompt, option) => {
  return new Promise(function(resolve, reject) {
    const dom = document.createElement('div')
    document.body.appendChild(dom)

    let app = createApp({
      ...dynamicComponent,
    }, {
      ...option,
      closed: () => {
        app.unmount()
        document.body.removeChild(dom)
        app = null
        reject('cancle')
      },
      success: (result) => {
        resolve(result)
      }
    })
    app.config.globalProperties.$filter = Object.keys($filters).reduce((curr, key) => {
      curr[key] = $filters[key];
      return curr 
    }, {})
    app.use(Form)
    app.use(Icon)
    app.use(Button)
    app.use(Field)
    app.use(CellGroup)
    app.use(Cell)
    app.use(Dialog)
    app.mount(dom)

  })
}