import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { practiceActions } from 'actions/practice'
import Title from './Title'
import List from './List'
// import ActionSheet from './ActionSheet'

class Practice extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    practice: PropTypes.instanceOf(Immutable.Map).isRequired,
    onPractice: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params: { categoryId }, onPractice } = this.props
    onPractice.getPracticeList(categoryId)
  }

  render () {
    const { practice } = this.props
    const listWrap = practice.get('list')

    const historyProps = {
      limit: 0,
      list: practice.get('history'),
    }

    return (
      <div className="content-box">
        <Header>练习</Header>
        <div className="content">
          <Title title="最近的5个练习" />
          <List {...historyProps} />
          <Title title="学校课程" />
          {listWrap.map((item, key) => {
            const idnumber = item.get('idnumber') || ''
            const listProps = {
              limit: 3,
              list: item.get('lessons'),
              info: {
                title: item.get('title'),
                cover: `/images/course-type/${idnumber.split('-')[0]}-big.png`,
                stage: item.get('stage'),
                idnumber,
              },
            }
            return (
              <List key={key} {...listProps} />
            )
          })}
          {/* <ActionSheet list={list} />*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  practice: state.get('practice'),
})

const mapDispatchToProps = dispatch => ({
  onPractice: bindActionCreators(practiceActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Practice)
