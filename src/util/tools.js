import request from '@/core/axios'

/**
 * 文件下载
 * @param  {String} url 目标文件地址
 * @param  {String} newFilename 想要保存的文件名称
 */
 export async function downloadFile (url, params) {
  const res = await request({
    url,
    method: 'get',
    timeout: 1000 * 60, 
    responseType: 'arraybuffer',
    params,
    $originalResponse: true,
    $loading: '下载中...'
  })
  const { data, headers } = res
  const blob = new Blob([data], {
    type: headers['content-type']
  })
  // 获取文件名
  const fileName = headers['content-disposition'].match(
    /filename=(.*)/
  )[1]
  saveAs(blob, decodeURI(fileName))
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs (blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const anchor = document.createElement('a')
    const body = document.querySelector('body')
    anchor.href = window.URL.createObjectURL(blob)
    anchor.download = filename

    anchor.style.display = 'none'
    body.appendChild(anchor)

    anchor.click()
    body.removeChild(anchor)

    window.URL.revokeObjectURL(anchor.href)
  }
}

/**
 * 使用文件下载代理
 * @param {*} origin_url 
 */
 export const useFileAgent = (origin_url, file_name = '', disposition='inline') => {
  const url = new URL(origin_url, window.location.origin)
  const {pathname, origin} = url
  const lastPath = pathname.split('/').at(-1)
  const originName = lastPath.split('.').shift()
  const fileName = file_name ? lastPath.replace(originName, file_name) : lastPath
  
  url.searchParams.append('fileName', fileName)
  url.searchParams.append('disposition', disposition)
  const relativeLink = url.toString().replace(origin, '/api/file_agent')
  /* const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/)
  const res = origin_url.match(reg)
  const hostName = res[0] */
  return relativeLink  
  //return origin_url.replace(hostName, '/api/file_agent') + `?fileName=${file_name}&disposition=attachment`
}