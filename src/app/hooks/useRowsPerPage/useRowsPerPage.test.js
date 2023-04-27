import { renderHook, act } from '@testing-library/react'
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
    const { result } = renderHook(() => useRowsPerPage(getMethods))
    const newRowsPerPage = 25

    act(() => {
      result.current.handleChangeRowsPerPage({
        target: { value: newRowsPerPage },
      })
    })

    expect(result.current.rowsPerPage).toBe(newRowsPerPage)
  })

  it('should dispatch getMethods with the correct limit parameter when handleChangeRowsPerPage is called', () => {
    const { result } = renderHook(() => useRowsPerPage(getMethods))
    const newRowsPerPage = 25

    act(() => {
      result.current.handleChangeRowsPerPage({
        target: { value: newRowsPerPage },
      })
    })

    expect(dispatch).toHaveBeenCalledWith(
      getMethods(`?limit=${newRowsPerPage}`),
    )
  })
})
