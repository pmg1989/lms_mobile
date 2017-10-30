import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { practiceDetailActions } from 'actions/practice'
import { audioPlayerActions } from 'actions/audio-player'
import Top from './Top'
import RecordList from '../../Home/RecordList'

class PracticeDetail extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    practiceDetail: PropTypes.instanceOf(Immutable.Map).isRequired,
    audioPlayer: PropTypes.instanceOf(Immutable.Map).isRequired,
    onPracticeDetail: PropTypes.object.isRequired,
    onAudioPlayer: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params: { categoryId }, onPracticeDetail } = this.props
    onPracticeDetail.getPracticeItem(categoryId)
  }

  render () {
    const { practiceDetail, audioPlayer, onAudioPlayer } = this.props

    const recordListProps = {
      audioPlayer,
      onAudioPlayer,
    }

    return (
      <div className="content-box">
        <Header>第1课</Header>
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
