import { styled } from '@mui/system'
import { DateTimePicker } from '@mui/x-date-pickers'

const CustomDateTimePicker = styled(DateTimePicker)(
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
    padding: '0.75rem 1rem',
    position: 'inherit',
    width: `${width}`,
    '& .MuiInputBase-root, .MuiInputBase-input': {
      textAlign: `${align}`,
      border: 'none',
      position: 'inherit',
      padding: '0',
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

export default CustomDateTimePicker
