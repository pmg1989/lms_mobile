# react_student_2.0

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
git clone git@github.com:pmg1989/react_student_2.0.git
```

cd react_student_2.0 进入目录安装依赖:

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

代码检测：

```bash
git项目提交时，会自动run precommit 进而执行 npm run lint，执行esLint代码检测
```
