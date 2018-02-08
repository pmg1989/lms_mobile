/* global Event */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Carousel } from 'antd-mobile'
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
      className: styles.banner_list,
      autoplay: true,
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

const Intro = () => {
  return (
    <div className={styles.intro_box}>
      <div className={styles.text_1}>
        独创的教学体系，多维一体的互动式教学课程，全方位提升学员音乐综合素质，打造音乐学习生态圈。
      </div>
      <div className={styles.text_2}>
        上海音乐谷校区、北京三里屯校区、深圳南山校区<br />南京艾尚校区、成都晶融汇校区、广州珠江新城校区
      </div>
      <div className={styles.text_3}>
        线下学校咨询电话<br /><span className={styles.phone}>400-888-0717</span>
      </div>
      <div className={styles.bottom}>
        <a className={styles.btn_booking} href="http://campaign2.newband.com/vshow2?showBack=true&shop=app&p=v3.1">预约参观学校</a>
      </div>
    </div>
  )
}

const Content = ({ bannerList }) => {
  return (
    <div className={classnames('content', styles.content)}>
      <div className={styles.fill_color_box}>
        <Banner list={bannerList} />
        <Intro />
      </div>
    </div>
  )
}

Content.propTypes = {
  bannerList: PropTypes.array.isRequired,
}

export default connect()(Content)
