const Routes = [
  {
    path: '/',
    component: require('./containers/App'),
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
        path: 'demo/:id/:detail',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Demo'))
          }, 'demo')
        },
      },
    ],
  },
]

export default Routes
