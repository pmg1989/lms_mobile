import { isIOS } from 'utils/app'
import { getTypeNameFromId } from 'utils/tools'

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
  zhuge.track('预约课程', {
    课程名称: params.categorySummary,
    课程时间: params.dates,
    课程类型: getTypeNameFromId(params.categoryId),
    录音歌曲名称: params.song || '',
    录音歌曲原唱: params.original_singer || '',
    是否自带伴奏: { 1: '是', 2: '否' }[params.back_source] || '',
  })
}

// 取消预约课程
function cancelReserve (params) {
  zhuge.track('取消预约课程', {
    课程名称: params.categorySummary,
    课程时间: params.dates,
    课程类型: getTypeNameFromId(params.categoryId),
  })
}

// 反馈课程
function feedback (params) {
  zhuge.track('反馈课程', {
    老师满意度: params.score,
    建议: params.lesson_suggestion,
    评价: params.teacher_suggestion,
    老师名字: params.teacher,
    课程名称: params.category_summary,
    课程时间: params.dates,
    课程类型: getTypeNameFromId(params.categoryId),
  })
}

export default {
  share,
  login,
  reserve,
  cancelReserve,
  feedback,
}
