import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Header } from 'components'

const Reserve = ({ courseType, contractId }) => {
  console.log('ownProps params id detail', courseType, contractId)

  return (
    <div className="content-box">
      <Header>demo</Header>
      <div className="content">
        <Link to={'/introduce'}>
          link to introduce
        </Link>
      </div>
    </div>
  )
}

Reserve.propTypes = {
  courseType: PropTypes.string.isRequired,
  contractId: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    courseType: ownProps.params.courseType,
    contractId: ownProps.params.contractId,
  }
}

export default connect(mapStateToProps)(Reserve)
