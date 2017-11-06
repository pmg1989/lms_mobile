import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { appActions } from 'actions'
import { Icon } from 'components'
import styles from './App.less'

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
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
        const isStudent = res.app.get('rolename') === 'student'
        if (!res.app.get('authorized') || !isStudent) {
          goTo(`/introduce?mobile=${mobile}&token=${token}`)
        }
      })
    } else {
      this.setState({ loading: false })
      goTo('/introduce')
    }
  }

  render () {
    const { children } = this.props
    const { loading } = this.state

    return (
      <div>
        {loading && <Icon className={styles.loading} type={require('svg/loading.svg')} />}
        {!loading && React.Children.map(children, (child) => {
          return React.cloneElement(child, {})
        })}
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onApp: bindActionCreators(appActions, dispatch),
  goTo: bindActionCreators(push, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
