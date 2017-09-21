/* global Event */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Carousel } from 'antd-mobile'
import { Icon } from 'components'
import styles from './Content.less'

class Banner extends Component {

  state = {
    initialHeight: 200,
  }

  render () {
    const { list } = this.props
    const { initialHeight } = this.state
    const heightProps = initialHeight ? { height: initialHeight } : {}

    const carouselProps = {
      className: styles.list,
      autoplay: false,
      infinite: true,
      swipeSpeed: 10,
    }

    return (
      <Carousel {...carouselProps}>
        {list.map((item, key) => (
          <a className={styles.item} href={item.link} key={key}>
            <img src={`./images/banner/${item.src}`} alt="banner" style={heightProps} onLoad={() => {
                // fire window resize event to change height
              window.dispatchEvent(new Event('resize'))
              this.setState({ initialHeight: null })
            }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
}

Banner.propTypes = {
  list: PropTypes.array.isRequired,
}

const Content = ({ bannerList }) => {
  return (
    <div className={classnames('content', styles.content)}>
      <Banner list={bannerList} />
      <Icon type={require('svg/enter.svg')} />
      <Icon type={require('svg/enter.svg')} className={styles.test1} />
      <Icon type={require('svg/enter.svg')} style={{ width: '2rem', height: '2rem' }} />
    </div>
  )
}

Content.propTypes = {
  bannerList: PropTypes.array.isRequired,
}

export default connect()(Content)
