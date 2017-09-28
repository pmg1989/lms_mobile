import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* containers */
import App from './containers/App'


const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={require('./containers/Home')} />
    <Route path="/introduce" component={require('./containers/Introduce')} />
    <Route path="/demo/:id/:detail" component={require('./containers/Demo')} />
  </Route>
)

// const Routes = [{
//   path: '/',
//   component: App,
//   indexRoute: {
//     component: require('./containers/Introduce'),
//   },
//   childRoutes: [{
//       path: 'introduce',
//       component: require('./containers/Introduce')
//   }]
// }]

export default Routes
