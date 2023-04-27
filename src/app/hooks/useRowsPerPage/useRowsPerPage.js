import { useState } from 'react'
import { useDispatch } from 'react-redux'

const useRowsPerPage = (getMethods) => {
  const dispatch = useDispatch()
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangeRowsPerPage = (event) => {
    dispatch(getMethods(`?limit=${parseInt(event.target.value, 10)}`))
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  return {
    rowsPerPage,
    handleChangeRowsPerPage,
  }
}

export default useRowsPerPage
