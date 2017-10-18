import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Header } from 'components'

const Reserve = ({ categoryId, contractId }) => {
  console.log('ownProps params id detail', categoryId, contractId)

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
  categoryId: PropTypes.string.isRequired,
  contractId: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    categoryId: ownProps.params.categoryId,
    contractId: ownProps.params.contractId,
  }
}

export default connect(mapStateToProps)(Reserve)
