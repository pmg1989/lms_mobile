import React from 'react'
import styles from './UserInfo.less'

const UserInfo = () => {
  return (
    <div className={styles.user_box} style={{
      background: 'url(\'https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg\') no-repeat center center',
      backgroundSize: 'cover' }}
    >
      <div className={styles.thumb_box}>
        <img src="https://o9u2lnvze.qnssl.com/teachers/profile/teacher2.jpg" alt="thumb" />
        <span className={styles.name}>李霞霞</span>
      </div>
      <div className={styles.area_name}>上海校区01</div>
    </div>
  )
}

export default UserInfo
