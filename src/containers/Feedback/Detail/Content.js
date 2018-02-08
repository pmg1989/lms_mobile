import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import { TextareaItem, Toast } from 'antd-mobile'
import moment from 'moment'
import { createForm } from 'rc-form'
import { RadioStar, Icon } from 'components'
import zhugeio from 'utils/zhugeio'
import styles from './Content.less'

const Title = ({ cur, inner, text, errors }) => (
  <div className={styles.title_box}>
    <span className={styles.number}>{cur}{ inner && '. ' }</span>
    <span className={classnames(styles.title, errors && styles.errors)}>{text}</span>
  </div>
)
Title.propTypes = {
  cur: PropTypes.number.isRequired,
  inner: PropTypes.bool,
  text: PropTypes.string.isRequired,
  errors: PropTypes.bool,
}

const Content = ({
    form: { getFieldProps, validateFields, getFieldError },
    editable,
    lessonId,
    item,
    lesson,
    onFeedback,
  }) => {
  const submit = (e) => {
    validateFields((errors, value) => {
      if (errors) {
        e.preventDefault()
        // for (let index in errors) {
        //   console.log(errors[index].errors[0].message)
        // }
      } else {
        onFeedback.submitFeedback({ ...value, lessonid: lessonId })
        .then(({ status, message }) => {
          if (status === 10000) {
            const { lesson_suggestion, teacher_suggestion, ...scores } = value
            const score = Object.keys(scores).reduce((preScore, key) => (preScore + (+scores[key])), 0)
            zhugeio.feedback({
              score,
              lesson_suggestion,
              teacher_suggestion,
              teacher: lesson.get('teacher'),
              category_summary: lesson.get('category_summary'),
              dates: moment.unix(lesson.get('available')).format('YYYY-MM-DD HH:mm'),
              categoryId: lesson.get('category_idnumber'),
            })

            Toast.info(
              <div className={styles.toast_box}>
                <Icon type={require('svg/status_present.svg')} />
                <span className={styles.msg}>反馈提交成功！</span>
              </div>,
              2,
              () => {
                browserHistory.goBack()
              },
            )
          } else {
            Toast.info((
              <div className={styles.toast_box}>
                <Icon type={require('svg/status_absent.svg')} />
                <span className={styles.msg}>{message}</span>
              </div>
            ), 2)
          }
        })
      }
    })
  }

  return (
    <div className={styles.box}>
      <Title cur={1} text="老师满意度" />
      <div className={styles.form_box}>
        <div className={styles.row}>
          <Title cur={1} inner text="老师课前教学准备充分度" errors={!!getFieldError('lesson_prepare_score')} />
          <RadioStar editable={editable}
            {...getFieldProps('lesson_prepare_score', {
              initialValue: item.get('lesson_prepare_score'),
              rules: [
                {
                  required: true,
                  message: '请填写老师课前教学准备充分度',
                },
              ],
            })}
          />
        </div>
        <div className={styles.row}>
          <Title cur={2} inner text="本课内容设计满意度" errors={!!getFieldError('lesson_content_score')} />
          <RadioStar editable={editable}
            {...getFieldProps('lesson_content_score', {
              initialValue: item.get('lesson_content_score'),
              rules: [
                {
                  required: true,
                  message: '请填写本课内容设计满意度',
                },
              ],
            })}
          />
        </div>
        <div className={styles.row}>
          <Title cur={3} inner text="老师课堂形象满意度" errors={!!getFieldError('teacher_appearance_score')} />
          <RadioStar editable={editable}
            {...getFieldProps('teacher_appearance_score', {
              initialValue: item.get('teacher_appearance_score'),
              rules: [
                {
                  required: true,
                  message: '请填写老师课堂形象满意度',
                },
              ],
            })}
          />
        </div>
        <div className={styles.row}>
          <Title cur={4} inner text="与老师有良好的互动" errors={!!getFieldError('lesson_interaction_score')} />
          <RadioStar editable={editable}
            {...getFieldProps('lesson_interaction_score', {
              initialValue: item.get('lesson_interaction_score'),
              rules: [
                {
                  required: true,
                  message: '请填写与老师有良好的互动',
                },
              ],
            })}
          />
        </div>
        <div className={styles.row}>
          <Title cur={5} inner text="老师讲课表达能力" errors={!!getFieldError('teacher_expression_score')} />
          <RadioStar editable={editable}
            {...getFieldProps('teacher_expression_score', {
              initialValue: item.get('teacher_expression_score'),
              rules: [
                {
                  required: true,
                  message: '请填写老师讲课表达能力',
                },
              ],
            })}
          />
        </div>
      </div>
      <Title cur={2} text="建议与意见(针对教学内容)" errors={!!getFieldError('lesson_suggestion')} />
      <div className={styles.form_box}>
        <TextareaItem
          {...getFieldProps('lesson_suggestion', {
            initialValue: item.get('lesson_suggestion'),
            rules: [
              {
                required: true,
                message: '请填写建议与意见(针对教学内容)',
              },
            ],
          })}
          editable={editable}
          placeholder="写下你对教学内容的建议与意见"
          rows={3}
          count={150}
        />
      </div>
      <Title cur={3} text="对老师的评价(针对老师)" errors={!!getFieldError('teacher_suggestion')} />
      <div className={styles.form_box}>
        <TextareaItem
          {...getFieldProps('teacher_suggestion', {
            initialValue: item.get('teacher_suggestion'),
            rules: [
              {
                required: true,
                message: '请填写对老师的评价(针对老师)',
              },
            ],
          })}
          editable={editable}
          placeholder="写下你对导师的建议与意见"
          rows={3}
          count={150}
        />
      </div>
      {editable &&
        <div className={styles.btn_box}>
          <span className={styles.btn} onClick={submit}>提交反馈</span>
        </div>
      }
    </div>
  )
}

Content.propTypes = {
  form: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  lessonId: PropTypes.string.isRequired,
  item: PropTypes.instanceOf(Immutable.Map).isRequired,
  lesson: PropTypes.instanceOf(Immutable.Map).isRequired,
  onFeedback: PropTypes.object.isRequired,
}

export default createForm()(Content)
