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
        bgcolor: theme.palette.background.blueLight,
        minHeight: '100%',
        overflow: 'auto',
        padding: '3rem 0.75rem',
      }}
    >
      <Box px={4}>
        <img src={LogoDefault} alt='logo' height={70} width={70} />
      </Box>
      <List sx={{ marginTop: '2rem' }}>
        {items?.map((item) => (
          <ListItem
            data-testid={`drawer-item-${item.title}`}
            key={item.title}
            onClick={() => navigate(item.href)}
            sx={{
              color: 'primary.main',
              margin: '0.5rem 0',
              paddingX: '0.5rem',
              paddingBottom: '0',
            }}
          >
            <CustomListItemButton
              selected={
                window.location.pathname.includes(item.href)
                && item.href !== '/'
              }
            >
              <ListItemIcon
                sx={{
                  color:
                    window.location.pathname.includes(item.href)
                    && item.href !== '/'
                      ? 'common.white'
                      : 'primary.main',
                  minWidth: '2.5rem',
                }}
              >
                <Icon name={item.icon} sx={{ fontSize: 22 }} />
              </ListItemIcon>
              <ListItemText
                color='primary.main'
                primary={item.title}
                sx={{ fontSize: '0.85rem' }}
              />
            </CustomListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        sx={{
          alignItems: 'flex-end',
          display: 'flex',
          flexDirection: 'row',
          height: '10%',
        }}
      >
        <ListItem
          data-testid='navbar-logout'
          button
          onClick={() => dispatch(logout())}
          sx={{ color: 'primary.main', margin: '1rem 0' }}
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
