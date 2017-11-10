import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import { Modal, Toast, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import zhugeio from 'utils/zhugeio'
import styles from './Confirm.less'

class Confirm extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    categorySummary: PropTypes.string.isRequired,
    curLesson: PropTypes.instanceOf(Immutable.Map).isRequired,
    onClose: PropTypes.func.isRequired,
    onReserve: PropTypes.object.isRequired,
  }

  state = {
    backSource: 2,
  }

  handleChange = backSource => () => {
    this.setState({ backSource })
    this.props.form.setFieldsValue({ back_source: backSource })
  }

  render () {
    const {
      visible,
      form: { getFieldProps, validateFields, getFieldError },
      params: { contractId, categoryId },
      categorySummary,
      curLesson,
      onClose,
      onReserve,
    } = this.props
    const { backSource } = this.state

    const isJL = categoryId.startsWith('jl-')

    const submit = (zhugeParams) => {
      onReserve.submitReserve(curLesson.get('lessonId'), contractId, categoryId).then(({ status, message, data }) => {
        if (status === 10000) {
          if (data.isok) {
            zhugeio.reserve(zhugeParams)
            Toast.info('预约成功!', 2, () => {
              browserHistory.goBack()
            })
          } else {
            Toast.info(message)
          }
        } else {
          Toast.info(message)
        }
        onClose()
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
                  onReserve.confirmReserve(curLesson.get('lessonId'), value)
                  .then(({ status, message }) => {
                    if (status === 10000) {
                      submit({
                        categorySummary,
                        categoryId,
                        dates: `${curLesson.get('date')} ${curLesson.get('label')}`,
                        ...value,
                      })
                    } else {
                      Toast.info(message)
                    }
                  })
                }
              })
            } else {
              submit({
                categorySummary,
                categoryId,
                dates: `${curLesson.get('date')} ${curLesson.get('label')}`,
              })
            }
          } },
      ],
    }

    return (
      <Modal {...modalProps}>
        <div className={styles.content}>
          <span>{categorySummary}</span><br />
          <span className={styles.red}>{curLesson.get('date')} {curLesson.get('label')}</span><br />
          <span>即将扣除<span className={styles.red}> 1 </span>课时</span>
          {isJL &&
            <div className={styles.jl_box}>
              <InputItem
                className={classnames(styles.input, !!getFieldError('song') && styles.errors)}
                clear placeholder="曲目" {...getFieldProps('song', {
                  rules: [
                    {
                      required: true,
                      message: '请填写曲目',
                    },
                  ] })}
              />
              <InputItem
                className={classnames(styles.input, !!getFieldError('original_singer') && styles.errors)}
                clear placeholder="原唱" {...getFieldProps('original_singer', {
                  rules: [
                    {
                      required: true,
                      message: '请填写原唱',
                    },
                  ] })}
              />
              <div className={styles.radio_box}>
                <input
                  style={{ display: 'none' }}
                  {...getFieldProps('back_source', {
                    initialValue: 2,
                    rules: [
                      {
                        required: true,
                        message: '请选择是否自带伴奏',
                      },
                    ],
                  })}
                />
                <span>自带伴奏</span>
                <div className={classnames(styles.radio, backSource === 1 && styles.active)} onClick={::this.handleChange(1)}>
                  是 <span className={styles.icon} />
                </div>
                <div className={classnames(styles.radio, backSource === 2 && styles.active)} onClick={::this.handleChange(2)}>
                  否 <span className={styles.icon} />
                </div>
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
}

export default createForm()(Confirm)
