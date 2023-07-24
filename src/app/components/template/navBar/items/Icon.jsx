import React from 'react'
import PropTypes from 'prop-types'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import CampaignIcon from '@mui/icons-material/Campaign'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MessageIcon from '@mui/icons-material/Message';

const Icon = ({ name, ...props }) => {
  const Icons = {
    admin: <AdminPanelSettingsIcon {...props} />,
    carrierServices: <AddBusinessIcon {...props} />,
    home: <HomeIcon {...props} />,
    partner: <PeopleIcon {...props} />,
    product: <LocalMallIcon {...props} />,
    profile: <PersonIcon {...props} />,
    campaign: <CampaignIcon {...props} />,
    notification: <NotificationsIcon {...props} />,
    messages: <MessageIcon {...props} />,
  }

  return Icons[name] ?? null
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
