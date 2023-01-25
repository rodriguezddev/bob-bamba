import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import items from './items'
import Icon from './items/Icon'
import CustomListItemButton from './styles'
import LogoDefault from '../../../assets/images/logo.png'
import { logout } from '../../../slices/auth/authSlice'
import theme from '../../../theme'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Box
      sx={{
        overflow: 'auto',
        minHeight: '100%',
        padding: '3.12rem 0.75rem',
        bgcolor: theme.palette.background.blueLight,
      }}
    >
      <Box px={4}>
        <img src={LogoDefault} width={85} height={100} alt='logo' />
      </Box>
      <List sx={{ marginTop: '2rem' }}>
        {items?.map((item) => (
          <ListItem
            data-testid={`drawer-item-${item.title}`}
            key={item.title}
            sx={{ color: 'primary.main', margin: '1rem 0' }}
            onClick={() => navigate(item.href)}
          >
            <CustomListItemButton
              selected={
                window.location.pathname.includes(item.href)
                && item.href !== '/'
              }
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  color:
                    window.location.pathname.includes(item.href)
                    && item.href !== '/'
                      ? 'common.white'
                      : 'primary.main',
                }}
              >
                <Icon name={item.icon} sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary={item.title} color='primary.main' />
            </CustomListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          height: '10%',
        }}
      >
        <ListItem
          data-testid='navbar-logout'
          button
          sx={{ color: 'primary.main', margin: '1rem 0' }}
          onClick={() => dispatch(logout())}
        >
          <ListItemIcon>
            <ExitToAppIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </Box>
  )
}

export default NavBar
