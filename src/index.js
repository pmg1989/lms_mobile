import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { useScroll } from 'react-router-scroll'
import 'utils/rem'
import 'utils/moment-locale'
import './themes/index.less'

import routers from './routes'
import store from './store'

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toJS()
  },
})

const renderUseScroll = useScroll((prevRouterProps, { routes }) => {
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false
  }
  if (routes.some(route => route.scrollToTop)) {
    return [0, 0]
  }
  return true
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routers} render={applyRouterMiddleware(renderUseScroll)} />
  </Provider>,
  document.getElementById('root')
)
