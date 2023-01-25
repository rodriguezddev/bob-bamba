import { styled } from '@mui/system'
import { Drawer } from '@mui/material'
import theme from '../../theme'

const CustomDrawer = styled(Drawer)(
  ({
    background, display, width, height,
  }) => ({
    '& .MuiDrawer-paper': {
      backgroundColor: background,
      borderRight: 'none',
      boxSizing: 'border-box',
      height,
      width,
    },
    [theme.breakpoints.up('xs')]: {
      display: display.xs,
    },
    [theme.breakpoints.up('sm')]: {
      display: display.sm,
    },
  }),
)

export default CustomDrawer
