const path = require('path')
const pxtorem = require('postcss-pxtorem');
const { version } = require('./package.json')

const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/svg/'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  hash: true,
  publicPath : `/${version}/`,
  outputPath : `./dist/${version}`,
  // outputPath : `./dist/deploy`,
  proxy: {
    "/v1": {
      "target": process.env.PROXY_HOST,
      "changeOrigin": true,
      // "pathRewrite": { "^/api/v1": "/v1" }
    },
  },
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  },
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }],
        ["module-resolver", {
          root: ["./src"],
          alias: {
            components: `${__dirname}/src/components`,
            utils: `${__dirname}/src/utils`,
            config: `${__dirname}/src/utils/config`,
            services: `${__dirname}/src/services`,
            constants: `${__dirname}/src/constants`,
            actions: `${__dirname}/src/actions`,
            svg: `${__dirname}/src/svg`,
            images: `${__dirname}/src/public/images`,
            themes: `${__dirname}/src/themes`,
          }
        }]
      ],
      define: {
        'NEWBAND.LMS.AUTH_HOST': 'http://school.newband.com:8083/v1/Login/phonelogin',
      },
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }],
        ["module-resolver", {
          root: ["./src"],
          alias: {
            components: `${__dirname}/src/components`,
            utils: `${__dirname}/src/utils`,
            config: `${__dirname}/src/utils/config`,
            services: `${__dirname}/src/services`,
            constants: `${__dirname}/src/constants`,
            actions: `${__dirname}/src/actions`,
            svg: `${__dirname}/src/svg`,
            themes: `${__dirname}/src/themes`,
          }
        }]
      ],
      define: {
        'NEWBAND.LMS.AUTH_HOST': 'http://school.newband.com:8083/v1/Login/phonelogin',
      },
    }
  },
  dllPlugin : {
    exclude: ["babel-runtime"],
    // include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
