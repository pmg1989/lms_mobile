import React from 'react'
import PropTypes from 'prop-types'
// import Immutable from 'immutable'
import classnames from 'classnames'
import { TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { RadioGroup, Radio } from 'components'
import styles from './Content.less'

const Title = ({ cur, text, errors }) => (
  <div className={styles.title_box}>
    <span className={styles.number}>{cur}</span>
    <span className={classnames(errors && styles.errors)}>{text}</span>
  </div>
)
Title.propTypes = {
  cur: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  errors: PropTypes.bool,
}

const RadioStar = ({ onChange, children }) => {
  return (
    <RadioGroup onChange={onChange} field={children}>
      <Radio type="satisfy" value="4">很满意</Radio>
      <Radio type="good" value="3">满意</Radio>
      <Radio type="soso" value="2">不太满意</Radio>
      <Radio type="bad" value="1">不满意</Radio>
    </RadioGroup>
  )
}
RadioStar.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

const Content = ({ form: { getFieldProps, validateFields, getFieldError, setFieldsValue } }) => {
  const submit = (e) => {
    validateFields((errors, value) => {
      if (errors) {
        e.preventDefault()
        console.log(errors)
        // for (let index in errors) {
        //   console.log(errors[index].errors[0].message)
        // }
      }
      console.log(value)
    })
  }

  const handleChangeChecked = field => (value) => {
    setFieldsValue({ [field]: value })
  }

  return (
    <div className={styles.box}>
      <Title cur={1} text="老师满意度" />
      <div className={styles.form_box}>
        <div className={styles.row}>
          <div className={classnames(styles.title, !!getFieldError('lesson_prepare_score') && styles.errors)}>1. 老师课前教学准备充分度</div>
          <RadioStar onChange={handleChangeChecked('lesson_prepare_score')}>
            <input
              style={{ display: 'none' }}
              {...getFieldProps('lesson_prepare_score', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请填写老师课前教学准备充分度',
                  },
                ],
              })}
            />
          </RadioStar>
        </div>
        <div className={styles.row}>
          <div className={classnames(styles.title, !!getFieldError('lesson_content_score') && styles.errors)}>2. 本课内容设计满意度</div>
          <RadioStar onChange={handleChangeChecked('lesson_content_score')}>
            <input
              style={{ display: 'none' }}
              {...getFieldProps('lesson_content_score', {
                initialValue: '3',
                rules: [
                  {
                    required: true,
                    message: '请填写本课内容设计满意度',
                  },
                ],
              })}
            />
          </RadioStar>
        </div>
        <div className={styles.row}>
          <div className={classnames(styles.title, !!getFieldError('teacher_appearance_score') && styles.errors)}>3. 老师课堂形象满意度</div>
          <RadioStar onChange={handleChangeChecked('teacher_appearance_score')}>
            <input
              style={{ display: 'none' }}
              {...getFieldProps('teacher_appearance_score', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请填写老师课堂形象满意度',
                  },
                ],
              })}
            />
          </RadioStar>
        </div>
        <div className={styles.row}>
          <div className={classnames(styles.title, !!getFieldError('lesson_interaction_score') && styles.errors)}>4. 与老师有良好的互动</div>
          <RadioStar onChange={handleChangeChecked('lesson_interaction_score')}>
            <input
              style={{ display: 'none' }}
              {...getFieldProps('lesson_interaction_score', {
                initialValue: '1',
                rules: [
                  {
                    required: true,
                    message: '请填写与老师有良好的互动',
                  },
                ],
              })}
            />
          </RadioStar>
        </div>
        <div className={styles.row}>
          <div className={classnames(styles.title, !!getFieldError('teacher_expression_score') && styles.errors)}>5. 老师讲课表达能力</div>
          <RadioStar onChange={handleChangeChecked('teacher_expression_score')}>
            <input
              style={{ display: 'none' }}
              {...getFieldProps('teacher_expression_score', {
                initialValue: '2',
                rules: [
                  {
                    required: true,
                    message: '请填写与老师有良好的互动',
                  },
                ],
              })}
            />
          </RadioStar>
        </div>
      </div>
      <Title cur={2} text="建议与意见(针对教学内容)" errors={!!getFieldError('lesson_suggestion')} />
      <div className={styles.form_box}>
        <TextareaItem
          {...getFieldProps('lesson_suggestion', {
            initialValue: '我已经被禁用了',
            rules: [
              {
                required: true,
                message: '请填写建议与意见(针对教学内容)',
              },
            ],
          })}
          editable={false}
          placeholder="写下你对教学内容的建议与意见"
          rows={3}
          count={150}
        />
      </div>
      <Title cur={3} text="对老师的评价(针对老师)" errors={!!getFieldError('teacher_suggestion')} />
      <div className={styles.form_box}>
        <TextareaItem
          {...getFieldProps('teacher_suggestion', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请填写对老师的评价(针对老师)',
              },
            ],
          })}
          placeholder="写下你对导师的建议与意见"
          rows={3}
          count={150}
        />
      </div>
      <div className={styles.btn_box}>
        <span className={styles.btn} onClick={submit}>提交反馈</span>
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
