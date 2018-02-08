import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { InputItem, Button } from 'antd-mobile'
import classnames from 'classnames'
import { createForm } from 'rc-form'
import { validPhone } from 'utils/utilsValid'
import SmsCode from './SmsCode'
import styles from './Form.less'

const Form = ({ login, onLogin, form: { getFieldProps, getFieldError, validateFields } }) => {
  const loading = login.get('loading')
  const handleGetPhoneCode = () => {
    validateFields(['phone'], (errors, values) => {
      if (!errors) {
        onLogin.sendCode(values.phone)
      }
    })
  }

  const handleSumbit = () => {
    validateFields((errors, values) => {
      if (!errors) {
        onLogin.smsLogin({ ...values, sid: login.get('sid') })
      }
    })
  }

  const smsCodeProps = {
    loading: loading.get('sendCode'),
    status: login.get('smsStatus'),
    onGetPhoneCode: handleGetPhoneCode,
    onResetStatus: onLogin.resetStatus,
  }

  return (
    <div className="content">
      <div className={styles.form}>
        <div className={styles.item}>
          <InputItem
            {...getFieldProps('phone', {
              // initialValue: '13023105710',
              rules: [
                {
                  required: true,
                  message: '请输入手机号码',
                },
                {
                  validator: validPhone,
                },
              ],
              validateTrigger: 'onBlur',
            })}
            placeholder="请输入手机号码"
          />
          <div className={styles.errors}>{getFieldError('phone')}</div>
        </div>
        <div className={styles.item}>
          <InputItem
            {...getFieldProps('smscode', {
              rules: [
                {
                  required: true,
                  message: '请输入验证码',
                },
                {
                  len: 4,
                  message: '验证码为四位数',
                },
              ],
              validateTrigger: 'onBlur',
            })}
            type="password"
            placeholder="请输入验证码"
          />
          <SmsCode {...smsCodeProps} />
          <div className={styles.errors}>{getFieldError('smscode')}</div>
        </div>
        <div className={classnames(styles.item, styles.btn_box)}>
          <Button disabled={loading.get('submit')} className={styles.btn_submit} onClick={handleSumbit} type="primary">登录</Button>
        </div>
      </div>
    </div>
  )
}

Form.propTypes = {
  form: PropTypes.object.isRequired,
  login: PropTypes.instanceOf(Immutable.Map).isRequired,
  onLogin: PropTypes.object.isRequired,
}

export default createForm()(Form)
