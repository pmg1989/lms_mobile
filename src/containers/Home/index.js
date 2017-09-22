import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header } from 'components'
// import { Content } from './Content'

const Home = () => {
  const headerProps = {
    leftContent: null,
    iconName: null,
  }

  return (
    <div className="content-inner">
      <Header {...headerProps}>牛班音乐学校</Header>
    </div>
  )
}

Home.propTypes = {
}

export default connect()(Home)
