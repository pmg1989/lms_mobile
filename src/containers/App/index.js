import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { appActions } from 'actions'
import { Icon } from 'components'
import styles from './App.less'

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    app: PropTypes.instanceOf(Immutable.Map).isRequired,
    location: PropTypes.object.isRequired,
    onApp: PropTypes.object.isRequired,
    goTo: PropTypes.func.isRequired,
  }

  state = {
    loading: true,
  }

  componentWillMount () {
    const { location: { query: { mobile, token } }, onApp, goTo } = this.props
    if (!!mobile && !!token) {
      onApp.authLogin(mobile, token).then((res) => {
        this.setState({ loading: false })
        if (!res.app.get('authorized')) {
          goTo('/login')
        }
      })
    } else {
      this.setState({ loading: false })
      goTo('/login')
    }
  }

  render () {
    const { children, app } = this.props
    const { loading } = this.state

    return (
      <div>
        {loading && <Icon className={styles.loading} type={require('svg/loading.svg')} />}
        {!loading && React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            app: Immutable.fromJS({
              userId: app.get('userid'),
              avatar: app.get('image'),
            }),
          })
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.get('app'),
})

const mapDispatchToProps = dispatch => ({
  onApp: bindActionCreators(appActions, dispatch),
  goTo: bindActionCreators(push, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
