import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, Empty } from 'components'
import { practiceActions } from 'actions/practice'
import Title from './Title'
import List from './List'
import ActionSheet from './ActionSheet'

class Practice extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    practice: PropTypes.instanceOf(Immutable.Map).isRequired,
    onPractice: PropTypes.object.isRequired,
  }

  state = {
    showActionSheet: false,
  }

  componentWillMount () {
    const { params: { categoryId }, onPractice } = this.props
    onPractice.getPracticeList(categoryId)
  }

  render () {
    const { practice, onPractice } = this.props
    const { showActionSheet } = this.state
    const listWrap = practice.get('list')

    const historyProps = {
      limit: 0,
      list: practice.get('history'),
    }

    const actionSheetProps = {
      idnumber: practice.get('idnumber'),
      list: practice.get('curLessons'),
      show: showActionSheet,
      onClose: () => {
        this.setState({ showActionSheet: false })
        document.body.removeAttribute('style')
      },
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
              onChangeActionSheet: (list, idNumber) => {
                this.setState({ showActionSheet: true })
                onPractice.changeCurLessons(list, idNumber)
                document.body.style.overflow = 'hidden'
              },
            }
            return (
              <List key={key} {...listProps} />
            )
          })}
          {listWrap.isEmpty() &&
            <div style={{ backgroundColor: '#fff' }}>
              <Empty type="music">暂无练习</Empty>
            </div>
          }
          <ActionSheet {...actionSheetProps} />
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
