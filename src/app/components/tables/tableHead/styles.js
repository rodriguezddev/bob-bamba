import { styled } from '@mui/system'
import { TableCell, tableCellClasses } from '@mui/material'
import theme from '../../../theme'

const CustomTableColumn = styled(TableCell)(
  ({
    color, fontSize, fontWeight, lineheight,
  }) => ({
    [`&.${tableCellClasses.head}`]: {
      borderBottom: `0.13rem solid ${theme.palette.primary.main}`,
      backgroundColor: 'common.white',
      color,
      fontSize,
      fontWeight,
      lineHeight: `${lineheight}`,
    },
  }),
)

export default CustomTableColumn
