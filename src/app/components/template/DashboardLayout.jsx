import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from '../appBar'
import MainPaper from './mainPaper/MainPaper'
import { MainDrawer } from '../drawer'
import NavBar from './navBar'
import theme from '../../theme'

const DashboardLayout = ({ children, window }) => {
  const container = window !== undefined && (() => window().document.body)
  const drawerWidth = '18.37rem'
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar drawer_width={drawerWidth} position='fixed'>
        <Toolbar sx={{ background: 'primary.main' }}>
          <IconButton
            aria-label='open drawer'
            color='inherit'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='div' noWrap variant='h6'>
            Bamba
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        aria-label='mailbox folders'
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <MainDrawer
          container={container}
          display={{ xs: 'block', sm: 'none' }}
          width={drawerWidth}
          ModalProps={{
            keepMounted: true,
          }}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          variant='temporary'
        >
          <NavBar />
        </MainDrawer>
        <MainDrawer
          display={{ xs: 'none', sm: 'block' }}
          width={drawerWidth}
          open
          variant='permanent'
        >
          <NavBar />
        </MainDrawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          bgcolor: theme.palette.background.blueLight,
        }}
      >
        <Toolbar sx={{ display: { sm: 'none' } }} />
        <MainPaper>{children}</MainPaper>
      </Box>
    </Box>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func,
}

DashboardLayout.defaultProps = {
  window: undefined,
}

export default DashboardLayout
