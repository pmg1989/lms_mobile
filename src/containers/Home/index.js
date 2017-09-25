import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { Header } from 'components'
import { audioPlayerActions } from 'actions/home'
import UserInfo from './UserInfo'
import Notice from './Notice'
import StudyList from './StudyList'
import RecordList from './RecordList'

const Home = ({ audioPlayer, onAudioPlayer }) => {
  const headerProps = {
    leftContent: null,
    iconName: null,
  }

  const recordListProps = {
    list: audioPlayer.get('list'),
    index: audioPlayer.get('index'),
    playing: audioPlayer.get('playing'),
    onAudioPlayer,
  }

  return (
    <div className="content-box">
      <Header {...headerProps}>牛班音乐学校</Header>
      <div className="content">
        <UserInfo />
        <Notice />
        <StudyList />
        <RecordList {...recordListProps} />
      </div>
    </div>
  )
}

Home.propTypes = {
  audioPlayer: PropTypes.instanceOf(Immutable.Map).isRequired,
  onAudioPlayer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    audioPlayer: state.getIn(['home', 'audioPlayer']),
  }
}

const mapDispatchToProps = dispatch => ({
  onAudioPlayer: bindActionCreators(audioPlayerActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
