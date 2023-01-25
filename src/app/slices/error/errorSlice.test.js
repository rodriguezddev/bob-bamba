import errorReducer, { handleHideError, handleSetError } from './errorSlice'

describe('authSlice redux', () => {
  const initialState = {
    isError: false,
    message: '',
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(errorReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle set error state', () => {
    const state = {
      isError: true,
      message: 'error',
    }

    expect(errorReducer(initialState, handleSetError('error'))).toEqual(state)
  })

  it('should handle hide error state', () => {
    const state = {
      isError: false,
      message: '',
    }

    expect(errorReducer(initialState, handleHideError())).toEqual(state)
  })
})
