import { styled } from '@mui/system'
import { Typography } from '@mui/material'

const CustomTitle = styled(Typography)(
  ({
    color, fontSize, fontWeight, lineHeight,
  }) => ({
    color: `${color}`,
    fontWeight: `${fontWeight}`,
    fontSize: `${fontSize}`,
    lineHeight: `${lineHeight}`,
  }),
)

export default CustomTitle
