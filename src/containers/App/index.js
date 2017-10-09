import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appActions } from 'actions'

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    onApp: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const { location: { query }, onApp } = this.props
    onApp.authLogin(query.mobile, query.token)
  }

  render () {
    const { children } = this.props

    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {})
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.get('app'),
})

const mapDispatchToProps = dispatch => ({
  onApp: bindActionCreators(appActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
