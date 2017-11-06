import React from 'react'
import { PropTypes } from 'prop-types'
import { goBack } from 'react-router-redux'
// import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Helmet } from 'react-helmet'
import styles from './Header.less'

const Header = ({ dispatch, children, ...headerProps }) => {
  const handleBack = () => {
    // browserHistory.goBack()
    dispatch(goBack())
  }

  const navBarProps = {
    leftContent: '',
    iconName: `#${require('../../svg/back.svg').default.id}`,
    mode: 'dark',
    onLeftClick: handleBack,
    ...headerProps,
  }

  return (
    <div className={styles['fixed-top']}>
      <Helmet><title>{children}</title></Helmet>
      <NavBar {...navBarProps}>
        {children.length > 12 ? `${children.substr(0, 12)}...` : children}
      </NavBar>
    </div>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  headerProps: PropTypes.object,
}

export default connect()(Header)
