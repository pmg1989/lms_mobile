import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header } from 'components'
import Content from './Content'

const Introduce = () => {
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
      <Header>牛班音乐学校</Header>
      <Content {...contentProps} />
    </div>
  )
}

Introduce.propTypes = {
}

export default connect()(Introduce)
