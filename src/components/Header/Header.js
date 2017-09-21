import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import styles from './Header.less'

class Header extends Component {
  state = {
    show: false,
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ show: true })
    }, 100)
  }

  render () {
    const { dispatch, children, ...headerProps } = this.props
    const { show } = this.state

    const handleBack = () => {
      // router.goBack()
    }

    const navBarProps = {
      leftContent: '返回',
      iconName: `#${require('../../svg/back.svg').default.id}`,
      mode: 'dark',
      onLeftClick: handleBack,
      ...headerProps,
    }

    return (
      <div className={styles['fixed-top']}>
        {show &&
          <NavBar {...navBarProps}>
            {children.length > 8 ? `${children.substr(0, 8)}...` : children}
          </NavBar>
        }
      </div>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  headerProps: PropTypes.object,
}

export default connect()(Header)
