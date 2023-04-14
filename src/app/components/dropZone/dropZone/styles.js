import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'
import theme from '../../../theme'

const DropContainer = styled(Paper)({
  alignItems: 'center',
  border: `0.125rem dashed ${theme.palette.primary.main}`,
  borderRadius: '0.625rem',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '12.5rem',
  justifyContent: 'center',
  transition: 'border .3s ease-in-out',
  '&:hover': {
    border: `0.125rem dashed ${theme.palette.secondary.main}`,
  },
  width: '100%',
})

export default DropContainer
