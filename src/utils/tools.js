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
  let min = parseInt(time / 60, 10).toString()
  let sec = parseInt(time % 60, 10).toString()
  if (min.length === 1) {
    min = `0${min}`
  }
  if (sec.length === 1) {
    sec = `0${sec}`
  }
  return `${min}:${sec}`
  // return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
}

export function renderTypeName (enName = '') {
  return {
    PROFESSION: '专业课',
    HD: '互动课',
    JL: '交流课',
  }[enName.toUpperCase()] || '未知'
}

export function getTypeNameFromId (categoryId) {
  if (categoryId.startsWith('hd-')) {
    return '互动'
  } else if (categoryId.startsWith('jl-')) {
    return '交流'
  }
  return '专业'
}

export function getTypeName (type) {
  return {
    vocal: '声乐',
    theory: '乐理',
    piano: '键盘',
    guitar: '吉他',
    eguitar: '电吉他',
    composition: '作曲',
  }[type] || '未知'
}
