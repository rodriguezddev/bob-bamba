import { React } from 'react'
import PropTypes from 'prop-types'
import CustomButton from './styles'

const MainButton = (props) => {
  const { children } = props

  return <CustomButton {...props}>{children}</CustomButton>
}

MainButton.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
  radius: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary']),
  width: PropTypes.string,
}

MainButton.defaultProps = {
  background: null,
  fontSize: '1rem',
  height: '2.5rem',
  onClick: null,
  radius: '1.5rem',
  type: 'primary',
  width: '9rem',
}

export default MainButton
