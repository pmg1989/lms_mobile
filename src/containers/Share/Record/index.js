import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from "react-helmet"
import { Header } from 'components'
import wechat from 'utils/wechat'
import Content from './Content'

class Record extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { query: { title, image } } = this.props.location
    wechat.share({
      title,
      desc: '我录了一首歌曲。',
      imgUrl: image,
      // type: 'music',
      // dataUrl: source,
    })
  }

  render () {
    const { query } = this.props.location
    const headerProps = {
      leftContent: null,
      iconName: null,
    }

    return (
      <div className="content-box">
        <Helmet><title>牛班音乐学校</title></Helmet>
        <Header {...headerProps}>牛班音乐学校</Header>
        <div className="content">
          <Content query={query} />
        </div>
      </div>
    )
  }
}

export default Record
