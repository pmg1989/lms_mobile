import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const App = ({ children }) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {})
      })}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default connect()(App)
