import React from 'react'
import PropTypes from 'prop-types'
import PersonIcon from '@mui/icons-material/Person'
import CustomAvatar from './styles'
import AvatarBambaMan from '../../assets/images/avatar_bamba_man.png'
import AvatarBambaWoman from '../../assets/images/avatar_bamba_woman.png'

const Avatar = (props) => {
  const { gender, image } = props
  let avatar = image

  if (!avatar) avatar = gender === 'M' ? AvatarBambaMan : AvatarBambaWoman

  return (
    <CustomAvatar alt='avatar' {...props} src={gender !== 'O' ? avatar : null}>
      {gender === 'O' && <PersonIcon />}
    </CustomAvatar>
  )
}

Avatar.propTypes = {
  gender: PropTypes.oneOf(['M', 'F', 'O']),
  height: PropTypes.string,
  image: PropTypes.string,
  width: PropTypes.string,
}

Avatar.defaultProps = {
  gender: 'O',
  height: '3.5rem',
  image: null,
  width: '3.5rem',
}

export default Avatar
