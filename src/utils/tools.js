// 根据key获取url中的参数
export function queryString (value) {
  const reg = new RegExp(`(^|&)${value}=([^&]*)(&|$)`, 'i')
  const r = location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

export function renderBgImage (url) {
  return {
    background: `url('${url}') no-repeat center center`,
    backgroundSize: 'cover',
  }
}

export function parseTime (time) {
  const min = parseInt(time / 60, 10).toString()
  const sec = parseInt(time % 60, 10).toString()
  return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
}
