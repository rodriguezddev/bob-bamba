import { useState } from 'react'

const useRowsPerPage = (getMethods, dispatch, rowsPage = 10) => {
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      getMethods(
        `${search ? `${search}&` : '?'}limit=${parseInt(
          event.target.value,
          10,
        )}`,
      ),
    )
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getMethods(
        `${search ? `${search}&` : '?'}${
          rowsPerPage ? `limit=${rowsPerPage}&` : ''
        }page=${newPage + 1}`,
      ),
    )
    setPage(newPage)
  }

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getMethods(path))
  }

  return {
    handleChangeRowsPerPage,
    handleSearch,
    onPageChange,
    rowsPerPage,
    page,
  }
}

export default useRowsPerPage
