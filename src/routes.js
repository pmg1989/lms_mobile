import React from 'react'
import { Route } from 'react-router'

/* containers */
import App from './containers/App'


const routes = (
  <Route path="/" component={App}>
    <Route path="/demo1" component={() => (<div>haha</div>)} />
  </Route>
)

export default routes
