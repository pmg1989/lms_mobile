import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { practiceActions } from 'actions/practice'
import List from './List'

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
      showMore: false,
      title: '最近的5个练习',
      list: practice.get('history'),
    }

    return (
      <div className="content-box">
        <Header>练习</Header>
        <div className="content">
          <List {...historyProps} />
          {listWrap.map((item, key) => {
            const listProps = {
              showMore: true,
              title: '学校课程',
              list: item.get('lessons'),
              info: {
                title: item.get('title'),
                thumb: item.get('cover'),
                idnumber: item.get('idnumber'),
                stage: item.get('stage'),
              },
            }
            return (
              <List key={key} {...listProps} />
            )
          })}
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
