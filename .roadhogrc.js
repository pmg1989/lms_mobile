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
    "/api": {
      "target": process.env.PROXY_HOST || 'http://school.newband.com:8083',
      "changeOrigin": true,
      "pathRewrite": { "^/api": "/" }
    },
    "/share/api": {
      "target": process.env.PROXY_SHARE_HOST || 'http://staging.web.newband.com:5000',
      "changeOrigin": true,
      "pathRewrite": { "^/share/api": "/api" }
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
    }
  },
  dllPlugin : {
    exclude: ["babel-runtime"],
    // include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
