import React from 'react'
import PropTypes from 'prop-types'
import CustomAppBar from './styles'

const AppBar = (props) => (
  <CustomAppBar {...props} />
)

AppBar.propTypes = {
  display: PropTypes.shape({
    sm: PropTypes.string,
    xs: PropTypes.string,
  }),
  drawer_width: PropTypes.string.isRequired,
}

AppBar.defaultProps = {
  display: { sm: 'none', xs: 'block' },
}

export default AppBar
