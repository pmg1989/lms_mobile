import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { Tabs } from 'antd-mobile'
import { Helmet } from 'react-helmet'
import { Header, Notice } from 'components'
import { isApp, getAppVersion, tools } from 'utils/app'
import { homeActions } from 'actions/home'
import { audioPlayerActions } from 'actions/audio-player'
import UserInfo from './UserInfo'
import CourseList from './CourseList'
import RecordList from './RecordList'
import FeedbackModal from './FeedbackModal'

const TabPane = Tabs.TabPane

class Home extends Component {
  static propTypes = {
    app: PropTypes.instanceOf(Immutable.Map).isRequired,
    home: PropTypes.instanceOf(Immutable.Map).isRequired,
    audioPlayer: PropTypes.instanceOf(Immutable.Map).isRequired,
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
    const { app, home, audioPlayer, onAudioPlayer } = this.props

    const headerProps = isApp() && getAppVersion() >= 410 ? {
      onLeftClick () {
        tools.returnback()
      },
    } : {
      leftContent: '',
      iconName: null,
      onLeftClick () {},
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
      audioPlayer,
      onAudioPlayer,
    }

    const feedbackModalProps = {
      feedbackList: home.get('feedbackList'),
    }

    return (
      <div className="content-box">
        <Helmet><title>牛班音乐学校</title></Helmet>
        <Header {...headerProps}>牛班音乐学校</Header>
        <div className="content">
          <UserInfo {...userInfoProps} />
          <Notice {...noticeProps} />
          <Tabs defaultActiveKey="2" swipeable={false}>
            <TabPane tab="待开课" key="1">
              <CourseList status={0} list={home.getIn(['course', 'commingList'])} />
            </TabPane>
            <TabPane tab="正在学习" key="2">
              <CourseList status={1} list={home.getIn(['course', 'studingList'])} />
            </TabPane>
            <TabPane tab="已结课" key="3">
              <CourseList status={2} list={home.getIn(['course', 'passedList'])} />
            </TabPane>
          </Tabs>
          <RecordList {...recordListProps} />
          <FeedbackModal {...feedbackModalProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.get('app'),
  home: state.get('home'),
  audioPlayer: state.get('audioPlayer'),
})

const mapDispatchToProps = dispatch => ({
  onHome: bindActionCreators(homeActions, dispatch),
  onAudioPlayer: bindActionCreators(audioPlayerActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
