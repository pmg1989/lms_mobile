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
          }
        }]
      ],
      define: {
        'newband.app.admin.ISMOCK': true,
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
          }
        }]
      ],
      define: {
        'newband.app.admin.ISMOCK': true,
      },
    }
  },
  dllPlugin : {
    exclude: ["babel-runtime"],
    // include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
