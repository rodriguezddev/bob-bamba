import { styled } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'

const CustomDatePicker = styled(DatePicker)(
  ({
    align, fontSize, height, radius, theme, width,
  }) => ({
    background: theme.palette.common.white,
    border: `0.13rem solid ${theme.palette.common.greyLight}`,
    borderRadius: radius,
    boxSizing: 'border-box',
    color: theme.palette.common.black,
    fontSize: `${fontSize}`,
    height: `${height}`,
    padding: '0.5rem 1rem',
    position: 'inherit',
    width: `${width}`,
    '& .MuiInputBase-root, .MuiInputBase-input': {
      border: 'none',
      padding: '0',
      position: 'inherit',
      textAlign: `${align}`,
    },
    '&.Mui-focused': {
      background: theme.palette.common.white,
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
  }),
)

export default CustomDatePicker
