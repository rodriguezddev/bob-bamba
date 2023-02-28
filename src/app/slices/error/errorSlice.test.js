import errorReducer, { handleHideError, handleSetError } from './errorSlice'

describe('authSlice redux', () => {
  const initialState = {
    codeError: null,
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
      codeError: 1,
      isError: true,
      message: 'Error test',
    }

    const payload = {
      code: 1,
      errors: { detail: 'Error test' },
    }

    expect(errorReducer(initialState, handleSetError(payload))).toEqual(state)
  })

  it('should handle hide error state', () => {
    const state = {
      codeError: null,
      isError: false,
      message: '',
    }

    expect(errorReducer(initialState, handleHideError())).toEqual(state)
  })
})
