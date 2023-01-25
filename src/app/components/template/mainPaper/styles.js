import { styled } from '@mui/system'
import { Paper } from '@mui/material'
import theme from '../../../theme'

const CustomPaper = styled(Paper)(
  ({
    background, radius,
  }) => ({
    backgroundColor: background,
    borderRadius: radius,
    display: 'flex',
    justifyContent: 'center',
    padding: '0.9rem 3.06rem',
    [theme.breakpoints.up('xs')]: {
      minHeight: 'calc(100vh - 5.37rem)',
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 2.87rem)',
    },
  }),
)

export default CustomPaper
