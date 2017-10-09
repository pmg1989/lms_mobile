import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { appActions } from 'actions'

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    onApp: PropTypes.object.isRequired,
    goTo: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const { location: { query: { mobile, token } }, onApp, goTo } = this.props
    if (!!mobile && !!token) {
      onApp.authLogin(mobile, token).then((res) => {
        if (!res.app.authorized) {
          goTo('/login')
        }
      })
    } else {
      goTo('/login')
    }
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
  goTo: bindActionCreators(push, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
