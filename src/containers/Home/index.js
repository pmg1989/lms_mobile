import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { Header } from 'components'
import UserInfo from './UserInfo'
import Notice from './Notice'
import StudyList from './StudyList'
import RecordList from './RecordList'

const Home = ({ audioPlayer }) => {
  const headerProps = {
    leftContent: null,
    iconName: null,
  }

  const recordListProps = {
    list: audioPlayer.get('list'),
    index: audioPlayer.get('index'),
    playing: audioPlayer.get('playing'),
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
}

function mapStateToProps (state) {
  return {
    audioPlayer: state.getIn(['home', 'audioPlayer']),
  }
}

export default connect(mapStateToProps)(Home)
