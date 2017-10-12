import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header } from 'components'
import Bottom from './Bottom'

const Progress = ({ params }) => {
  console.log('params', params)

  const headerProps = {
    rightContent: (
      <span>练习</span>
    ),
  }

  return (
    <div className="content-box">
      <Header {...headerProps}>hahaha</Header>
      <div className="content">
        <Bottom />
      </div>
    </div>
  )
}

Progress.propTypes = {
  params: PropTypes.object.isRequired,
}

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
