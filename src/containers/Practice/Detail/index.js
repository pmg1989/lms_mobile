import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Header } from 'components'
import zhugeio from 'utils/zhugeio'
import { practiceDetailActions } from 'actions/practice'
import { audioPlayerActions } from 'actions/audio-player'
import Top from './Top'
import RecordList from './RecordList'

class PracticeDetail extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    practiceDetail: PropTypes.instanceOf(Immutable.Map).isRequired,
    audioPlayer: PropTypes.instanceOf(Immutable.Map).isRequired,
    onPracticeDetail: PropTypes.object.isRequired,
    onAudioPlayer: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params: { categoryId, index }, onPracticeDetail } = this.props
    onPracticeDetail.getPracticeItem(categoryId, index)
    zhugeio.enterPracticeDetail({ categoryId })
  }

  render () {
    const { practiceDetail, audioPlayer, onAudioPlayer, onPracticeDetail } = this.props

    const index = practiceDetail.getIn(['info', 'index']) || ''
    const recordListProps = {
      audioPlayer,
      onAudioPlayer,
      onPracticeDetail,
    }

    return (
      <div className="content-box">
        <Helmet><title>{`第${index}课`}</title></Helmet>
        <Header>第{index}课</Header>
        <div className="content">
          <Top info={practiceDetail.get('info')} />
          <RecordList {...recordListProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  practiceDetail: state.getIn(['practice', 'detail']),
  audioPlayer: state.get('audioPlayer'),
})

const mapDispatchToProps = dispatch => ({
  onPracticeDetail: bindActionCreators(practiceDetailActions, dispatch),
  onAudioPlayer: bindActionCreators(audioPlayerActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PracticeDetail)
