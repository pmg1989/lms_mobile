import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { practiceDetailActions } from 'actions/practice'
import Top from './Top'
// import RecordList from './RecordList'

class PracticeDetail extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    practiceDetail: PropTypes.instanceOf(Immutable.Map).isRequired,
    onPracticeDetail: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params: { categoryId }, onPracticeDetail } = this.props
    onPracticeDetail.getPracticeItem(categoryId)
  }

  render () {
    const { practiceDetail } = this.props

    return (
      <div className="content-box">
        <Header>第1课</Header>
        <div className="content">
          <Top info={practiceDetail.get('info')} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  practiceDetail: state.getIn(['practice', 'detail']),
})

const mapDispatchToProps = dispatch => ({
  onPracticeDetail: bindActionCreators(practiceDetailActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PracticeDetail)
