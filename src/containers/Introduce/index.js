import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import classnames from 'classnames'
import { isApp, isIOS, getAppVersion, tools } from 'utils/app'
import { Header } from 'components'
import Content from './Content'

const Introduce = () => {
  const headerProps = isApp() && getAppVersion() >= 410 && getAppVersion() < 412 ? {
    onLeftClick () {
      // 兼容ios 返回bug
      browserHistory.goBack()
      setTimeout(() => { tools.returnback() }, 0)
    },
  } : {
    leftContent: '',
    iconName: null,
    onLeftClick () {},
  }

  const contentProps = {
    bannerList: [{
      link: '',
      src: '1.png',
    }, {
      link: '',
      src: '2.png',
    }, {
      link: '',
      src: '3.png',
    }],
  }

  return (
    <div className={classnames('content-box', isIOS() && getAppVersion() >= 410 && 'ios')}>
      <Header {...headerProps}>牛班音乐学校</Header>
      <Content {...contentProps} />
    </div>
  )
}

Introduce.propTypes = {
}

export default connect()(Introduce)
