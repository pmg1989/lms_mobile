import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import classnames from 'classnames'
import { isApp, isIOS, getAppVersion, tools } from 'utils/app'
import { Header } from 'components'
import { loginActions } from 'actions/login'
import { appActions } from 'actions/app'
import Form from './Form'

class Login extends Component {
  static propTypes = {
    login: PropTypes.instanceOf(Immutable.Map).isRequired,
    onLogin: PropTypes.object.isRequired,
  }

  componentWillMount () {
    // this.props.onLogin.getUserInfo().then((res) => {
    //   res.authorized && browserHistory.push('/')
    // })
  }

  render () {
    const { login, onLogin } = this.props
    const headerProps = isApp() && getAppVersion() >= 410 ? {
      onLeftClick () {
        // 兼容ios 返回bug
        browserHistory.goBack()
        setTimeout(() => { tools.returnback() }, 0)
      },
    } : {
      leftContent: '',
      iconName: null,
      onLeftClick () { },
    }

    const formProps = {
      login,
      onLogin,
    }

    return (
      <div className={classnames('content-box', isIOS() && getAppVersion() >= 410 && 'ios')}>
        <Header {...headerProps}>手机号码快速登录</Header>
        <Form {...formProps} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  login: state.get('login'),
})

const mapDispatchToProps = dispatch => ({
  onLogin: bindActionCreators({ ...loginActions, getUserInfo: appActions.getUserInfo }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
