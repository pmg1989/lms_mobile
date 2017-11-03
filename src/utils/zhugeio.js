import { isIOS } from 'utils/app'

const type = isIOS() ? 'ios' : 'android'

// 登录信息采集
function login (params) {
  zhuge.identify(params.mobile, {
    name: params.firstname, // 预定义属性
    avatar: params.image, // 预定义属性
    学号: params.idnumber,
    校区: params.school,
    角色: params.rolename,
    用户名: params.uname,
    设备平台: type,
  })
}

// 分享我的录音
function share (title, author) {
  zhuge.track('分享我的录音', {
    歌曲名称: title,
    原唱: author,
    分享渠道: type,
  })
}

// 预约课程
function reserve (params) {
  function getCategory (categoryId) {
    if (categoryId.startsWith('hd-')) {
      return '互动'
    } else if (categoryId.startsWith('jl-')) {
      return '交流'
    }
    return '专业'
  }

  zhuge.track('预约课程', {
    课程名称: params.categorySummary,
    课程时间: params.dates,
    课程类型: getCategory(params.categoryId),
    录音歌曲名称: params.song || '',
    录音歌曲原唱: params.original_singer || '',
    是否自带伴奏: { 1: '是', 2: '否' }[params.back_source] || '',
  })
}

export default {
  share,
  login,
  reserve,
}
