import React from 'react'
import { Header } from 'components'

const Error = () => {
  return (
    <div className="content-box">
      <Header>页面找不到了</Header>
      <div className="content">
        <p>抱歉，您访问的页面找不到了</p>
      </div>
    </div>
  )
}

export default Error
