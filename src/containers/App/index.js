import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appActions } from 'actions'

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    onApp: PropTypes.object.isRequired,
  }

  componentDidMount () {
    const { location: { query: { mobile, token } }, onApp } = this.props
    if (!!mobile && !!token) {
      onApp.authLogin(mobile, token).then((res) => {
        console.log(res)
      })
    } else {
      console.log('to login')
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
