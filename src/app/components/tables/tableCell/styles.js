import { styled } from '@mui/system'
import { TableCell, tableCellClasses } from '@mui/material'

const CustomTableCell = styled(TableCell)(
  ({
    color, fontSize, lineheight,
  }) => ({
    [`&.${tableCellClasses.body}`]: {
      color: `${color}`,
      fontSize: `${fontSize}`,
      lineHeight: `${lineheight}`,
    },
  }),
)

export default CustomTableCell
