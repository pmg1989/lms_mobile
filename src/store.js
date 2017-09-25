import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import Immutable from 'immutable'
import reducers from './reducers'

const store = createStore(reducers,
  Immutable.Map({}),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
