import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useDispatch } from 'react-redux'
import useRowsPerPage from './useRowsPerPage'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

describe('send rows limit hook', () => {
  let getMethods
  let dispatch

  beforeEach(() => {
    getMethods = jest.fn()
    dispatch = jest.fn()
    useDispatch.mockReturnValue(dispatch)
  })

  afterEach(() => {
    useDispatch.mockReset()
    dispatch.mockReset()
  })

  it('should initialize rowsPerPage with 10', () => {
    const { result } = renderHook(() => useRowsPerPage(getMethods))

    expect(result.current.rowsPerPage).toBe(10)
  })

  it('should update rowsPerPage when handleChangeRowsPerPage is called', () => {
    const { result } = renderHook(() => useRowsPerPage(getMethods, dispatch))
    const { handleChangeRowsPerPage } = result.current

    act(() => {
      handleChangeRowsPerPage({ target: { value: '20' } })
    })

    expect(dispatch).toHaveBeenCalledWith(getMethods('?limit=20'))
    expect(result.current.rowsPerPage).toBe(20)
  })

  it('should dispatch getMethods with the correct limit parameter when handleChangeRowsPerPage is called', () => {
    const { result } = renderHook(() => useRowsPerPage(getMethods, dispatch))
    const { handleChangeRowsPerPage } = result.current
    const newRowsPerPage = 25

    act(() => {
      handleChangeRowsPerPage({ target: { value: newRowsPerPage } })
    })

    expect(dispatch).toHaveBeenCalledWith(
      getMethods(`?limit=${newRowsPerPage}`),
    )
  })

  it('should update page and call dispatch when onPageChange is called', () => {
    const { result } = renderHook(() => useRowsPerPage(getMethods, dispatch))
    const { onPageChange } = result.current

    act(() => {
      onPageChange({ target: { value: '20' } }, 1)
    })

    expect(dispatch).toHaveBeenCalledWith(getMethods('?limit=10&page=2'))
    expect(result.current.page).toBe(1)
  })
})
