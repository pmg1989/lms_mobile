/* global Event */
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Carousel } from 'antd-mobile'
import styles from './Introduce.less'

const bannerList = [{
  link: '',
  src: '1.png',
}, {
  link: '',
  src: '2.png',
}, {
  link: '',
  src: '3.png',
}]

class Introduce extends Component {

  state = {
    list: bannerList,
    initialHeight: 200,
  }

  render () {
    const { list, initialHeight } = this.state
    const heightProps = initialHeight ? { height: initialHeight } : {}

    const carouselProps = {
      className: styles.list,
      autoplay: false,
      infinite: true,
      swipeSpeed: 10,
    }

    return (
      <div>
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
      </div>
    )
  }
}

Introduce.propTypes = {
}

export default connect()(Introduce)
