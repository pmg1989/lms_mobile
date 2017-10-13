import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { Header } from 'components'
import { progressActions } from 'actions/progress'
import Top from './Top'
import Content from './Content'
import Bottom from './Bottom'

class Progress extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    progress: PropTypes.instanceOf(Immutable.Map).isRequired,
    onProgress: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params, onProgress } = this.props
    onProgress.getProgressInfo(params.contractId, params.courseType)
  }

  render () {
    const { progress } = this.props
    const info = progress.get('info')
    const lessons = progress.get('lessons')

    const headerProps = {
      rightContent: (
        <span>练习</span>
      ),
    }

    const contentProps = {
      lessons,
      category: info.get('category_idnumber'),
    }

    const bottomProps = {
      hasFeedback: info.get('hasFeedback'),
    }

    return (
      <div className="content-box">
        <Header {...headerProps}>{info.get('title')}</Header>
        <div className="content">
          <Top info={info} />
          <Content {...contentProps} />
          <Bottom {...bottomProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  progress: state.get('progress'),
  params: {
    ...ownProps.params,
    contractId: decodeURIComponent(ownProps.params.contractId),
  },
})

const mapDispatchToProps = dispatch => ({
  onProgress: bindActionCreators(progressActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
