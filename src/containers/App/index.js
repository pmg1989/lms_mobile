import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { isIOS, getAppVersion } from 'utils/app'
import classnames from 'classnames'
import { appActions } from 'actions/app'
import { Icon } from 'components'
import styles from './App.less'

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    onApp: PropTypes.object.isRequired,
    goTo: PropTypes.func.isRequired,
  }

  state = {
    loading: true,
  }

  componentWillMount () {
    const { location: { query: { mobile, token } }, onApp, goTo } = this.props
    if (!!mobile && !!token) {
      onApp.authLogin(mobile, token).then((res) => {
        const isStudent = res.app.get('rolename') === 'student'
        if (res.app.get('authorized') && isStudent) {
          this.setState({ loading: false })
        } else {
          goTo(`/introduce?mobile=${mobile}&token=${token}`)
        }
      })
    } else {
      onApp.getUserInfo().then((res) => {
        if (res.authorized) {
          this.setState({ loading: false })
        } else {
          goTo('/login')
        }
      })
    }
  }

  render () {
    const { children } = this.props
    const { loading } = this.state

    return (
      <div className={classnames(isIOS() && getAppVersion() >= 410 && 'ios')}>
        {loading && <Icon className={styles.loading} type={require('svg/loading.svg')} />}
        {!loading && React.Children.map(children, (child) => {
          return React.cloneElement(child, {})
        })}
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onApp: bindActionCreators(appActions, dispatch),
  goTo: bindActionCreators(push, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
