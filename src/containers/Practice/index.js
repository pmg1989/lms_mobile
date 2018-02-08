import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, Empty } from 'components'
import { practiceListActions } from 'actions/practice'
import zhugeio from 'utils/zhugeio'
import Title from './Title'
import List from './List'
import ActionSheet from './ActionSheet'
import styles from './List.less'

class Practice extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    practiceList: PropTypes.instanceOf(Immutable.Map).isRequired,
    onPracticeList: PropTypes.object.isRequired,
  }

  state = {
    showActionSheet: false,
  }

  componentWillMount () {
    const { params: { categoryId }, onPracticeList } = this.props
    onPracticeList.getPracticeList(categoryId)
    zhugeio.enterPractice({ categoryId })
  }

  render () {
    const { practiceList, onPracticeList } = this.props
    const { showActionSheet } = this.state
    const listWrap = practiceList.get('list')
    const history = practiceList.get('history')

    const historyProps = {
      limit: 0,
      list: history,
    }

    const actionSheetProps = {
      idnumber: practiceList.get('idnumber'),
      list: practiceList.get('curLessons'),
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
          {!history.isEmpty() && <Title title="最近的5个练习" />}
          {!history.isEmpty() && <List {...historyProps} />}
          {listWrap.isEmpty() ?
            <Empty className={styles.empty_box} type="music">暂无练习</Empty> :
            <Title title="学校课程" />
          }
          {listWrap.map((item, key) => {
            const idnumber = item.get('idnumber') || ''
            const listProps = {
              limit: 10000, // 之前限制显示三条，需求变更后已不限制显示条目
              list: item.get('lessons'),
              info: {
                title: item.get('title'),
                cover: item.get('cover'),
                stage: item.get('stage'),
                idnumber,
              },
              onChangeActionSheet: (list, idNumber) => {
                this.setState({ showActionSheet: true })
                onPracticeList.changeCurLessons(list, idNumber)
                document.body.style.overflow = 'hidden'
              },
            }
            return (
              <List key={key} {...listProps} />
            )
          })}
          <ActionSheet {...actionSheetProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  practiceList: state.getIn(['practice', 'list']),
})

const mapDispatchToProps = dispatch => ({
  onPracticeList: bindActionCreators(practiceListActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Practice)
