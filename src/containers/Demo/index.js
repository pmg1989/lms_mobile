import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header } from 'components'

const Demo = ({ params, location, id, detail, query }) => {
  console.log('params', params)
  console.log('location', location)
  console.log('ownProps params id detail', id, detail)
  console.log('ownProps location query', query)

  return (
    <div className="content-box">
      <Header>demo</Header>
      <div className="content" />
    </div>
  )
}

Demo.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    detail: ownProps.params.detail,
    query: ownProps.location.query,
  }
}

export default connect(mapStateToProps)(Demo)
