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
    console.log(progress.toJS())
    const headerProps = {
      rightContent: (
        <span>练习</span>
      ),
    }

    return (
      <div className="content-box">
        <Header {...headerProps}>hahaha</Header>
        <div className="content">
          <Top />
          <Content />
          <Bottom />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    progress: state.get('progress'),
  }
}

const mapDispatchToProps = dispatch => ({
  onProgress: bindActionCreators(progressActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
