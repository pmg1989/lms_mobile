const hostname = location.hostname

function getEnv () {
  if (hostname === 'student.newband.com') {
    return 'production'
  }
  if (['staging.app.newband.com', 'edu.newband.cn'].includes(hostname)) {
    return 'staging'
  }
  return 'staging'
}

function isProduction () {
  return getEnv() === 'production'
}

function getAuthHost () {
  if (isProduction()) {
    return 'https://lmsapi.newband.com/v1/Login/phonelogin'
  }
  return 'http://school.newband.com:8083/v1/Login/phonelogin'
}

function getBaseShare () {
  if (isProduction()) {
    return 'https://galaxyapi.newband.com/api/v1/social/wxcfg'
  }
  return 'http://staging.web.newband.com:5000/api/v1/social/wxcfg'
}

export default {
  authHost: getAuthHost(),
  baseShare: getBaseShare(),
  env: getEnv(),
  logoSrc: 'https://o9u2lnvze.qnssl.com/web/global/brand.png',
  defaultImage: 'https://o9u2lnvze.qnssl.com/appbanner/3bec92be7ea938384408d207cb27c338.png',
  wstoken: '65b6372750516f21e18d27037edad0e0',
  baseURL: '/api/moodle/webservice/rest/server.php',
  wstokenFuncs: [
    'mod_serviceauthorize_applogin',
    'mod_serviceauthorize_phonelogin',
    'mod_serviceauthorize_sendsmscode',
  ],
}
