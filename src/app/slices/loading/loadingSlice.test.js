import loadingReducer, { handleLoading, handleNotLoading } from './loadingSlice'

describe('loadingSlice redux', () => {
  const initialState = {
    isLoading: false,
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(loadingReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle loading state', () => {
    const state = { isLoading: true }

    expect(loadingReducer(initialState, handleLoading())).toEqual(state)
  })

  it('should handle not loading state', () => {
    const state = { isLoading: false }

    expect(loadingReducer(initialState, handleNotLoading())).toEqual(state)
  })
})
