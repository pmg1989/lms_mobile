import React from 'react'
import PropTypes from 'prop-types'
// import Immutable from 'immutable'
// import classnames from 'classnames'
import { TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import styles from './Content.less'

const Title = ({ cur, text }) => (
  <div className={styles.title_box}>
    <span className={styles.number}>{cur}</span>{text}
  </div>
)
Title.propTypes = {
  cur: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}

const Content = ({ form: { getFieldProps } }) => {
  return (
    <div className={styles.box}>
      <Title cur={1} text="老师满意度" />
      <div className={styles.form_box}>
        haha
      </div>
      <Title cur={2} text="建议与意见(针对教学内容)" />
      <div className={styles.form_box}>
        <TextareaItem
          {...getFieldProps('text1', {
            initialValue: '',
          })}
          placeholder="写下你对教学内容的建议与意见"
          rows={3}
          count={150}
        />
      </div>
      <Title cur={3} text="对老师的评价(针对老师)" />
      <div className={styles.form_box}>
        <TextareaItem
          {...getFieldProps('text2', {
            initialValue: '',
          })}
          placeholder="写下你对导师的建议与意见"
          rows={3}
          count={150}
        />
      </div>
    </div>
  )
}

Content.propTypes = {
  form: PropTypes.object.isRequired,
  // category: PropTypes.string.isRequired,
  // lessons: PropTypes.instanceOf(Immutable.List).isRequired,
  // onProgress: PropTypes.object.isRequired,
}

export default createForm()(Content)
