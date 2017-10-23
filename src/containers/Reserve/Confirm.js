import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import { Modal, Toast, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import styles from './Confirm.less'

const Confirm = ({
    visible,
    form: { getFieldProps, validateFields, getFieldError },
    params: { contractId, categoryId },
    categorySummary,
    curLesson,
    onClose,
    submitReserve,
  }) => {
  const isJL = categoryId.startsWith('jl-')

  const submit = () => {
    onClose()
    submitReserve(curLesson.get('lessonId'), contractId, categoryId).then(({ status, message }) => {
      if (status === 10000) {
        Toast.info('预约成功!', 2, () => {
          browserHistory.goBack()
        })
      } else {
        Toast.info(message)
      }
    })
  }

  const modalProps = {
    className: styles.bg,
    platform: 'ios',
    title: '您预约的是',
    transparent: true,
    visible,
    footer: [
      { text: '取消', onPress: onClose },
      { text: '确定',
        onPress: () => {
          if (isJL) {
            validateFields((errors, value) => {
              if (!errors) {
                console.log(value)
              }
            })
          } else {
            submit()
          }
        } },
    ],
  }

  return (
    <Modal {...modalProps}>
      <div className={styles.content}>
        <span>{categorySummary}</span><br />
        <span className={styles.red}>{curLesson.get('date')} {curLesson.get('label')}</span><br />
        <span>即将收取<span className={styles.red}> 1 </span>课时</span>
        {isJL &&
          <div className={styles.jl_box}>
            <InputItem
              className={classnames(styles.input, !!getFieldError('song') && styles.errors)}
              clear placeholder="原唱" {...getFieldProps('song', {
                rules: [
                  {
                    required: true,
                    message: '请填写原唱',
                  },
                ] })}
            />
            <InputItem
              className={classnames(styles.input, !!getFieldError('original_singer') && styles.errors)}
              clear placeholder="曲目" {...getFieldProps('original_singer', {
                rules: [
                  {
                    required: true,
                    message: '请填写曲目',
                  },
                ] })}
            />
            <div className={styles.radio_box}>
              <span>自带伴奏</span>
            </div>
            <div className={styles.tips_box}>
              <div className={styles.title}>温馨提示：</div>
                1. 填写录音课演唱曲目信息；<br />
                2. 请提前和专业课老师沟通录制曲目；<br />
                3. 演唱曲目超出学校设备点播范围，请自带伴奏；<br />
                4. 自带伴奏记得带上U盘噢～
            </div>
          </div>
        }
      </div>
    </Modal>
  )
}

Confirm.propTypes = {
  visible: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  categorySummary: PropTypes.string.isRequired,
  curLesson: PropTypes.instanceOf(Immutable.Map).isRequired,
  onClose: PropTypes.func.isRequired,
  submitReserve: PropTypes.func.isRequired,
}

export default createForm()(Confirm)
