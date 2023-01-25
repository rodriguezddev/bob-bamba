import { styled } from '@mui/system'
import { AppBar } from '@mui/material'
import theme from '../../theme'

const CustomAppBar = styled(AppBar)(
  ({
    display, drawer_width: drawerWidth,
  }) => ({
    [theme.breakpoints.up('sm')]: {
      display: display.sm,
      ml: drawerWidth,
      width: `calc(100% - ${drawerWidth})`,
    },
    [theme.breakpoints.down('xs')]: {
      display: display.xs,
    },
  }),
)

export default CustomAppBar
