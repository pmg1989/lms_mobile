# LMS_MOBILE_2.0

### 目录结构

```bash
├── /dist/           # 项目发布输出目录
├── /src/            # 项目源码目录
│ ├── /public/       # 公共文件模块，编译时copy至dist目录
│ ├── /components/   # UI组件模块
│ │ ├── index.js     # 全局 export default 入口
│ ├── /constants/    # constant 常量配置模块
│ │ ├── index.js     # 常量配置配置入口
│ ├── /container/             # 容器组件模块
│ │ └── App/index.js          # APP入口
│ ├── /reducers/       # reducer模块
│ │ ├── index.js     # reducer模块入口
│ ├── /services/     # 数据接口模块
│ ├── /svg/          # svg文件目录
│ ├── /themes/       # 项目公共样式目录
│ ├── /mock/         # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── app.js       # 跟APP交互配置
│ │ ├── rem.js       # 浏览器适配配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── zhugeio.js   # 诸葛IO统计开发配置
│ ├── routes.js      # 路由配置
│ ├── index.js       # 入口文件
│ └── entry.dev.ejs  # 开发环境下html入口文件  
│ └── entry.ejs      # 发布环境下html入口文件     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .roadhogrc.js    # roadhog配置
└── webpack.config.js# webpack相关配置
```

## 开发及构建

克隆项目文件:

```
git clone git@git.coding.net:newband-dev/lms_mobile.git
```

cd lms_mobile 进入目录安装依赖:

```
npm install 或者 yarn 或者 yarn install
```

开发：

```bash
git checkout develop
npm run build:dll #第一次npm run dev时需运行此命令，使开发时编译更快
npm run dev

打开 http://localhost:8002?mobile=13023105710&token=xxxxxxx
```


staging环境构建发布：

```bash
本地环境
git checkout build-staging
git merge develop
yarn run build-staging
git acm 'fix some bugs' or (git add . && git commit -m 'fix some bugs')
git push
git checkout develop 切换回开发模式继续后续的开发

登录staging服务器
cd /var/www/html/lms_mobile
git checkout build-staging
git pull
```

release环境构建发布：
```bash
本地环境
git checkout build-release
git merge develop
yarn run build-release
git acm 'fix some bugs' or (git add . && git commit -m 'fix some bugs')
git push
git checkout develop 切换回开发模式继续后续的开发

登录production服务器
cd /srv/lms/lms_mobile
git checkout build-release
git pull
```

release环境本地开启调试：
```bash
git checkout develop
npm run start

打开 http://localhost:8002?mobile=13023105710&token=xxxxxxx
```

代码检测：

```bash
git项目提交时，会自动run precommit 进而执行 npm run lint，执行esLint代码检测
```

### 注意事项

- buid-staing、build-release两个分支目前只作为发布分支在本地发布时使用，切莫在此分之下直接开发，而应该切换至develop分支下进行开发
- 切莫将buid-staing与build-release两个分支合并至master 或 develop 分支上，合并会导致主分支添加不必要的发布信息log
- 在开发任务完成后，发布时才切换至buid-staing、build-release相应分支进行发布部署
- 本地发布完成并push后，登录相关环境服务器，cd至目标地址，直接 git pull 即可完成发布部署
- buid-staing、build-release两个分支作为本地发布分支，是一种本地发布服务器拉取发布的一种流程，后期也可以升级服务器的nodeJS环境，直接将发布流程移动至服务器发布部署