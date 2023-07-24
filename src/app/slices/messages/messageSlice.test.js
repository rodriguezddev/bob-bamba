import { configureStore } from '@reduxjs/toolkit'
import messageReducer, {
  deleteMessage,
  getMessages,
  messageSlice,
  resetMessage,
} from './messageSlice'
import httpService from '../../services/api_services/HttpService'

describe('messageSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(messageReducer(undefined, { type: 'unknown' })).toEqual({
      messages: {
        data: [],
        meta: {},
      },
      message: {
        createMessage: {
          isSuccess: false,
        },
      },
    })
  })

  it('should return message state', async () => {
    const responseMock = {
      data: [
        {
          id: '36d0a7a2-5ded-4a47-86fc-b283e2bc12bf',
          name: 'Seguro de Accidentes 100K',
          sku: 'Seguro de Accidentes 100K',
          cost_per_year: 0,
          cost_per_month: 0,
          is_enabled: true,
          carrier: {
            id: 'e5e55b66-bc96-4ec3-acd4-373078fcc67b',
            name: 'BBVA',
            code: 'BBVA',
            is_enabled: true,
          },
          category: {
            id: '0e259b99-6c35-4cc2-8a03-1c525b9b25a0',
            name: 'insurance',
            code: 'INSURANCE',
          },
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
        prev: null,
        next: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 2,
        links: [
          {
            url: null,
            label: '&laquo; Anterior',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=1',
            label: '1',
            active: true,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
            label: '2',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/carrier-services',
        per_page: 10,
        to: 10,
        total: 15,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: messageSlice.reducer })
    await store.dispatch(getMessages())

    const { messages } = await store.getState()

    expect(messages).toEqual(responseMock)
  })

  it('should get message thunk request', async () => {
    const dispatch = jest.fn()

    const state = {
      messages: {
        data: [],
        meta: {},
      },
      message: {
        createMessage: {
          isSuccess: false,
        },
      },
    }

    const thunk = getMessages()

    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/message/pending')
    expect(calls[1][0].type).toEqual('list/message/rejected')
  })

  it('should return delete message state', async () => {
    const state = {
      data: [],
      meta: {},
    }

    jest.spyOn(httpService, 'delete').mockResolvedValueOnce()

    const store = configureStore({ reducer: messageSlice.reducer })
    await store.dispatch(deleteMessage('8827daa2-78ea-4d00-af5f-c2dc7eba13c7'))

    const { messages } = await store.getState()
    expect(messages).toEqual(state)
  })

  it('should delete message thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      messages: {
        data: [],
        meta: {},
      },
      message: {
        createMessage: {
          isSuccess: false,
        },
      },
    }

    const thunk = deleteMessage()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('delete/message/pending')
    expect(calls[1][0].type).toEqual('delete/message/rejected')
  })

  it('should handle resetMessage', () => {
    const state = {
      messages: {
        data: [],
        meta: {},
      },
      message: {
        createMessage: {
          isSuccess: false,
        },
      },
    }

    const actualState = messageReducer(state, resetMessage())

    expect(actualState.message).toEqual({
      createMessage: {
        isSuccess: false,
      },
    })
  })
})
