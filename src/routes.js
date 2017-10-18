// import { appConstants } from 'constants'

// function isLogin () {
//   return !!sessionStorage.getItem(appConstants.UTOKEN)
// }
//
// function redirectToLogin (nextState, replace) {
//   if (!isLogin()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname, nextSearch: location.search },
//     })
//   }
// }
//
// function redirectToHome (nextState, replace) {
//   if (isLogin()) {
//     replace('/')
//   }
// }

const Routes = [
  {
    path: '/',
    component: require('./containers/App'),
    // onEnter: redirectToLogin,
    getIndexRoute (location, cb) {
      require.ensure([], (require) => {
        cb(null, { component: require('./containers/Home') })
      }, 'home')
    },
    childRoutes: [
      {
        path: 'introduce',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Introduce'))
          }, 'introduce')
        },
      },
      {
        path: 'progress/:contractId/:categoryId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Progress'))
          }, 'progress')
        },
      },
      {
        path: 'reserve/:contractId/:categoryId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Reserve'))
          }, 'reserve')
        },
      },
      {
        path: 'review/:lessonId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Review'))
          }, 'review')
        },
      },
      {
        path: 'feedback/:contractId/:categoryId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Feedback'))
          }, 'feedback')
        },
      },
      {
        path: 'feedback/:contractId/:categoryId/:lessonId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Feedback/Detail'))
          }, 'feedback-detail')
        },
      },
    ],
  },
  {
    path: 'login',
    getComponent (location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/Introduce'))
      }, 'login')
    },
  },
  {
    path: 'demo/:id/:detail',
    getComponent (location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/Demo'))
      }, 'demo')
    },
  },
  {
    path: '*',
    name: 'error',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/Error'))
      }, 'error')
    },
  },
]

export default Routes
