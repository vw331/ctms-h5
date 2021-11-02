import { createApp } from 'vue'
import { Button,CellGroup,  Dialog, Form, Field } from 'vant';
import Prompt from './Prompt'

export default (option) => {
  return new Promise(function(resolve, reject) {

    const dom = document.createElement('div')
    document.body.appendChild(dom)

    let app = createApp({
      ...Prompt,
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

    app.use(Form)
    app.use(Button)
    app.use(Field)
    app.use(CellGroup)
    app.use(Dialog)
    app.mount(dom)

  })
}