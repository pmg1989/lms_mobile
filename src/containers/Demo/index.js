import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Header } from 'components'

const Demo = ({ params, location, id, detail, query }) => {
  console.log('params', params)
  console.log('location', location)
  console.log('ownProps params id detail', id, detail)
  console.log('ownProps location query', query)

  console.log(moment().fromNow())

  const timeList = [
    1476880800,
    1496880800,
    1506880800,
    1507870800,
    1507880800,
    1508385600,
    1510880800,
    1530880800,
    1550880800,
    1580880800,
  ]

  return (
    <div className="content-box">
      <Header>demo</Header>
      <div className="content">
        <p>{moment.locale()}</p>
        {timeList.map((time, key) => (
          <p key={key}>{moment.unix(time).format('YYYY-MM-DD HH:mm')} - {moment.unix(time).fromNow()} - {`${moment.unix(time).isAfter(new Date().getTime())}`}</p>
        ))}
      </div>
    </div>
  )
}

Demo.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    detail: ownProps.params.detail,
    query: ownProps.location.query,
  }
}

export default connect(mapStateToProps)(Demo)
