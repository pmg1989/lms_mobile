import { isIOS } from 'utils/app'

export function ioShare (title, author) {
  const type = isIOS() ? 'ios' : 'android'

  zhuge.track('分享我的录音', {
    歌曲名称: title,
    原唱: author,
    分享渠道: type,
  })
}
