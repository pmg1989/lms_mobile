import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { Header } from 'components'
import { audioPlayerActions, homeActions } from 'actions/home'
import UserInfo from './UserInfo'
import Notice from './Notice'
import StudyList from './StudyList'
import RecordList from './RecordList'

class Home extends Component {
  static propTypes = {
    app: PropTypes.instanceOf(Immutable.Map).isRequired,
    home: PropTypes.instanceOf(Immutable.Map).isRequired,
    onHome: PropTypes.object.isRequired,
    onAudioPlayer: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { app, onHome } = this.props
    onHome.getNotice()
    onHome.getCourseList(app.get('userid'))
    onHome.getRecordList(app.get('userid'), app.get('image'))
  }

  render () {
    const { app, home, onAudioPlayer } = this.props
    const audioPlayer = home.get('audioPlayer')

    const headerProps = {
      leftContent: null,
      iconName: null,
    }

    const userInfoProps = {
      avatar: app.get('image'),
      firstName: app.get('firstname'),
      school: app.get('school'),
    }

    const noticeProps = {
      notice: home.get('notice'),
    }

    const recordListProps = {
      list: audioPlayer.get('list'),
      index: audioPlayer.get('index'),
      playing: audioPlayer.get('playing'),
      switching: audioPlayer.get('switching'),
      onAudioPlayer,
    }

    return (
      <div className="content-box">
        <Header {...headerProps}>牛班音乐学校</Header>
        <div className="content">
          <UserInfo {...userInfoProps} />
          <Notice {...noticeProps} />
          <StudyList />
          <RecordList {...recordListProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.get('app'),
    home: state.get('home'),
  }
}

const mapDispatchToProps = dispatch => ({
  onHome: bindActionCreators(homeActions, dispatch),
  onAudioPlayer: bindActionCreators(audioPlayerActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
