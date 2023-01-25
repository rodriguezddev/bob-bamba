import { configureStore } from '@reduxjs/toolkit'
import categoryReducer, { getCategories, categorySlice } from './categorySlice'
import httpService from '../../services/api_services/HttpService'

describe('categorySlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(categoryReducer(undefined, { type: 'unknown' })).toEqual({
      categories: {
        data: [],
        meta: {},
      },
    })
  })

  it('should return carrier services state', async () => {
    const responseMock = {
      data: [
        {
          id: '87cdb7f4-c8d1-4a45-87ba-2d3cdab25bfb',
          name: 'Culpa voluptas.',
          code: 'culpa-voluptas',
        },
      ],
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: categorySlice.reducer })
    await store.dispatch(getCategories())

    const { categories } = await store.getState()

    expect(categories).toEqual(responseMock)
  })
})
