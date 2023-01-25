import React from 'react'
import PropTypes from 'prop-types'
import CustomTitle from './styles'

const GeneralTitle = (props) => {
  const { text } = props

  return (
    <CustomTitle
      component='div'
      {...props}
    >
      {text}
    </CustomTitle>
  )
}

GeneralTitle.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.string,
  text: PropTypes.string.isRequired,
}

GeneralTitle.defaultProps = {
  color: 'primary.main',
  fontSize: '1.5rem',
  fontWeight: '600',
  lineHeight: '2.56',
}

export default GeneralTitle
