import React from 'react'
import PropTypes from 'prop-types'
import CustomDrawer from './styles'

const MainDrawer = (props) => (
  <CustomDrawer {...props} />
)

MainDrawer.propTypes = {
  background: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

MainDrawer.defaultProps = {
  background: 'background.default',
  width: null,
  height: '100%',
}

export default MainDrawer
