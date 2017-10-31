function isIOS () {
  return !!/NB-GENERAL-IOS/i.test(navigator.userAgent)
}

function isAndroid () {
  return !!/NB-GENERAL-AND/i.test(navigator.userAgent)
}

function isApp () {
  return isIOS() || isAndroid()
}

function getAppVersion () {
  let val = /\[NB\](.*?)\[\!NB\]/.exec(navigator.userAgent)
  if (val && val.length > 1) {
    val = JSON.parse(val[1])
    return +val.VERSION.replace(/\./g, '')
  }
  return 0
}

function mockCallApp (str, params) {
  console.log(`invoking app - ${str}`, params)
}

if (!window.android) {
  window.android = {
    returnback (params) { mockCallApp('returnback', params) },
    share (params) { mockCallApp('share', params) },
  }
}

if (!window.webkit) {
  window.webkit = {
    messageHandlers: {
      returnback: { postMessage (params) { mockCallApp('returnback', params) } },
      share: { postMessage (params) { mockCallApp('share', params) } },
    },
  }
}

const tools = {
  returnback (params) {
    if (isAndroid()) {
      window.android.returnback(params)
    } else if (isIOS()) {
      window.webkit.messageHandlers.returnback.postMessage(params)
      // returnback(params)
    }
  },
  share (params) {
    if (isAndroid()) {
      window.android.share(JSON.stringify(params))
    } else if (isIOS()) {
      window.webkit.messageHandlers.share.postMessage(params)
      // share(params)
    }
  },
}

export {
  getAppVersion,
  isAndroid,
  isIOS,
  isApp,
  tools,
}
