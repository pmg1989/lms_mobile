import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'components'
import Content from './Content'

const Record = ({ location }) => {
  const { pathname, query, search } = location
  console.log(pathname, query, search, window.location.origin)
  const headerProps = {
    leftContent: null,
    iconName: null,
  }

  return (
    <div className="content-box">
      <Header {...headerProps}>牛班音乐学校</Header>
      <div className="content">
        <Content query={query} />
      </div>
    </div>
  )
}

Record.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Record
