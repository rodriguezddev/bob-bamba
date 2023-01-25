import React from 'react'
import PropTypes from 'prop-types'

const DescriptionList = ({ description }) => (
  <>
    <b>{description.section}</b>
    {description.body.map((body) => (
      <li
        style={{
          textAlign: 'left',
          margin: '1rem',
        }}
        key={body}
      >
        {body}
      </li>
    ))}
  </>
)

DescriptionList.propTypes = {
  description: PropTypes.shape({
    section: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.string),
  }),
}

DescriptionList.defaultProps = {
  description: {},
}

export default DescriptionList
