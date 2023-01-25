import { styled } from '@mui/system'
import { TableRow } from '@mui/material'
import theme from '../../../theme'

const CustomTableRow = styled(TableRow)(
  ({
    border,
  }) => ({
    borderBottom: `${border} solid ${theme.palette.common.black}`,
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }),
)

export default CustomTableRow
