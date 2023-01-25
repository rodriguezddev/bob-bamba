import { styled } from '@mui/system'
import { Avatar } from '@mui/material'

const CustomAvatar = styled(Avatar)(
  ({
    height, width,
  }) => ({
    height,
    width,
  }),
)

export default CustomAvatar
