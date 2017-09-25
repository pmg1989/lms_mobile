import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header } from 'components'
import UserInfo from './UserInfo'
import Notice from './Notice'
import StudyList from './StudyList'
import RecordList from './RecordList'

const Home = () => {
  const headerProps = {
    leftContent: null,
    iconName: null,
  }

  return (
    <div className="content-box">
      <Header {...headerProps}>牛班音乐学校</Header>
      <div className="content">
        <UserInfo />
        <Notice />
        <StudyList />
        {/*<StudyList />*/}
        <RecordList />
      </div>
    </div>
  )
}

Home.propTypes = {
}

export default connect()(Home)
