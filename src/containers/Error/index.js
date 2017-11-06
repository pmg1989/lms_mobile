import React from 'react'
import { Helmet } from "react-helmet"
import { Header, Icon } from 'components'
import styles from './Error.less'

const Error = () => {
  return (
    <div className="content-box">
      <Helmet><title>页面找不到了</title></Helmet>
      <Header>页面找不到了</Header>
      <div className="content">
        <div className={styles.box}>
          <Icon className={styles.icon} type={require('svg/cry.svg')} />
          <p>抱歉，您访问的页面找不到了</p>
        </div>
      </div>
    </div>
  )
}

export default Error
