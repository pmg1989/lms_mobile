import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import reducers from './reducers'

const store = createStore(reducers,
  Immutable.Map({}),
  compose(
    applyMiddleware(
      routerMiddleware(browserHistory),
      thunk,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
