import { styled } from '@mui/system'
import { ListItemButton } from '@mui/material'

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '10px',
    width: '14.25rem',
    height: '2.81rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}))

export default CustomListItemButton
