import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { reserveActions } from 'actions/reserve'
import Content from './Content'

class Reserve extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    reserve: PropTypes.instanceOf(Immutable.Map).isRequired,
    onReserve: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params: { contractId, categoryId }, onReserve } = this.props
    onReserve.getReserveList(contractId, categoryId)
  }

  render () {
    const { reserve } = this.props
    const contentProps = {
      dayOfLessons: reserve.get('dayOfLessons'),
    }

    return (
      <div className="content-box">
        <Header>本课满意度调查</Header>
        <div className="content">
          <Content {...contentProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reserve: state.getIn(['reserve']),
})

const mapDispatchToProps = dispatch => ({
  onReserve: bindActionCreators(reserveActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reserve)
