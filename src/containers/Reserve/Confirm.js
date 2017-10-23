import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { browserHistory } from 'react-router'
import { Modal, Toast } from 'antd-mobile'
import styles from './Confirm.less'

const Confirm = ({
    visible,
    params: { contractId, categoryId },
    categorySummary,
    curLesson,
    onClose,
    submitReserve,
  }) => {
  const modalProps = {
    platform: 'ios',
    title: '您预约的是',
    transparent: true,
    visible,
    footer: [
        { text: '取消', onPress: onClose },
      { text: '确定',
        onPress: () => {
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
        } },
    ],
  }

  return (
    <Modal {...modalProps}>
      <div className={styles.content}>
        <span>{categorySummary}</span><br />
        <span className={styles.red}>{curLesson.get('date')} {curLesson.get('label')}</span><br />
        <span>即将收取<span className={styles.red}> 1 </span>课时</span>
      </div>
    </Modal>
  )
}

Confirm.propTypes = {
  visible: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  categorySummary: PropTypes.string.isRequired,
  curLesson: PropTypes.instanceOf(Immutable.Map).isRequired,
  onClose: PropTypes.func.isRequired,
  submitReserve: PropTypes.func.isRequired,
}

export default Confirm
