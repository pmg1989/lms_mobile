import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isApp, getAppVersion, tools } from 'utils/app'
import { Header } from 'components'
import Content from './Content'

const Introduce = () => {
  const headerProps = isApp() && getAppVersion() >= 410 ? {
    onLeftClick () {
      tools.returnback()
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
    <div className="content-box">
      <Header {...headerProps}>牛班音乐学校</Header>
      <Content {...contentProps} />
    </div>
  )
}

Introduce.propTypes = {
}

export default connect()(Introduce)
