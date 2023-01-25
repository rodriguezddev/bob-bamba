import React from 'react'
import PropTypes from 'prop-types'
import HomeIcon from '@mui/icons-material/Home'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LocalMallIcon from '@mui/icons-material/LocalMall'

const Icon = ({ name, ...props }) => {
  const Icons = {
    admin: <AdminPanelSettingsIcon {...props} />,
    home: <HomeIcon {...props} />,
    partner: <PeopleOutlineIcon {...props} />,
    product: <LocalMallIcon {...props} />,
    profile: <PersonOutlineIcon {...props} />,
  }

  return Icons[name] ?? null
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
