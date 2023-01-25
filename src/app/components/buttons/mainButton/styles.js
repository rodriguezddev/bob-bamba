import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const CustomButton = styled(Button)(
  ({
    background, fontSize, height, radius, theme, type, width,
  }) => ({
    color: `${
      type !== 'secondary'
        ? theme.palette.common.white
        : theme.palette.primary.main
    }`,
    backgroundColor: `${background || theme.palette.primary.main}`,
    boxShadow: 'none',
    border: 'none',
    fontSize: `${fontSize}`,
    fontWeight: '700',
    borderRadius: `${radius}`,
    lineHeight: '24px',
    cursor: 'pointer',
    textTransform: 'none',
    width: `${width}`,
    height: `${height}`,
    padding: '12px',
    '&:hover': {
      backgroundColor: `${background || theme.palette.primary.main}`,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.common.greyLight,
    },
  }),
)

export default CustomButton
