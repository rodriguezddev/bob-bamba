import React from 'react'
import PropTypes from 'prop-types'
import CustomPaper from './styles'

const MainPaper = (props) => (
  <CustomPaper {...props} />
)

MainPaper.propTypes = {
  background: PropTypes.string,
  radius: PropTypes.string,
}

MainPaper.defaultProps = {
  background: 'common.white',
  radius: '2%',
}

export default MainPaper
