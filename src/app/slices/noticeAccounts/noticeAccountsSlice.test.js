import { configureStore } from '@reduxjs/toolkit'
import noticeAccountReducer, {
  createNoticeAccounts,
  deleteNoticeAccounts,
  getNoticeAccounts,
  noticeAccountsSlice,
  resetNoticeAccounts,
  updateNoticeAccounts,
} from './noticeAccountsSlice'
import httpService from '../../services/api_services/HttpService'

describe('noticeAccountsSlice redux', () => {
  it('should handle initial state', () => {
    expect(noticeAccountReducer(undefined, { type: 'unknown' })).toEqual({
      noticeAccounts: {
        data: [],
        meta: {},
      },
      noticeAccount: {
        isSuccess: false,
      },
      config: {},
    })
  })

  it('should return noticeAccounts state', async () => {
    const responseMock = {
      data: [
        {
          id: '7c775d03-f6cb-48cb-8571-d2c1ab282860',
          name: 'Agente Bamba (5625774041)',
          keys: {
            phone_id: '116422888031263',
            account_id: '114901301537529',
          },
          is_enabled: true,
          provider: 'WHATSAPP',
          notification_type: 'WHATSAPP',
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
        prev: null,
        next: null,
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        links: [
          {
            url: null,
            label: '&laquo; Anterior',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/notice-accounts',
        per_page: 10,
        to: 5,
        total: 5,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: noticeAccountsSlice.reducer })
    await store.dispatch(getNoticeAccounts())

    const { noticeAccounts } = await store.getState()

    expect(noticeAccounts).toEqual(responseMock)
  })

  it('should  get noticeAccounts thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      admins: {
        data: [],
        meta: {},
        createAdmins: {},
        deleteAdmin: {},
      },
      admin: {},
    }
    const thunk = getNoticeAccounts()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/noticeAccounts/pending')
    expect(calls[1][0].type).toEqual('list/noticeAccounts/rejected')
  })

  it('should return create noticeAccounts state', async () => {
    const formData = {
      name: 'Audra Lucas',
      keys: {
        from_email: 'cudaq@mailinator.com',
        from_name: 'Vernon Conner',
      },
      is_enabled: false,
      provider: 'MANDRILL',
      notification_type: 'EMAIL',
    }

    const responseMock = {
      data: {
        id: '75869080-b29e-4035-8f8a-f8fa8c927d49',
        name: 'Audra Lucas',
        keys: {
          from_email: 'cudaq@mailinator.com',
          from_name: 'Vernon Conner',
        },
        is_enabled: false,
        provider: 'MANDRILL',
        notification_type: 'EMAIL',
      },
    }

    const state = {
      data: [
        {
          id: '75869080-b29e-4035-8f8a-f8fa8c927d49',
          name: 'Audra Lucas',
          keys: {
            from_email: 'cudaq@mailinator.com',
            from_name: 'Vernon Conner',
          },
          is_enabled: false,
          provider: 'MANDRILL',
          notification_type: 'EMAIL',
        },
      ],
      meta: {},
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: noticeAccountsSlice.reducer })
    await store.dispatch(createNoticeAccounts(formData))

    const { noticeAccounts } = await store.getState()

    expect(noticeAccounts).toEqual(state)
  })

  it('should create noticeAccounts thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      admins: {
        data: [],
        meta: {},
        createAdmins: {},
        deleteAdmin: {},
      },
      admin: {},
    }
    const thunk = createNoticeAccounts()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual(
      'noticeAccounts/createNoticeAccounts/pending',
    )
    expect(calls[1][0].type).toEqual(
      'noticeAccounts/createNoticeAccounts/rejected',
    )
  })

  it('should return delete noticeAccounts state', async () => {
    const state = { data: [], meta: {} }

    const responseMock = {
      data: [],
    }

    jest.spyOn(httpService, 'delete').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: noticeAccountsSlice.reducer })
    await store.dispatch(deleteNoticeAccounts({ id: '75869080', name: 'test' }))

    const { noticeAccounts } = await store.getState()

    expect(noticeAccounts).toEqual(state)
  })

  it('should delete noticeAccounts thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      noticeAccounts: {
        data: [],
        meta: {},
      },
      noticeAccount: {
        isSuccess: false,
      },
      config: {},
    }
    const thunk = deleteNoticeAccounts()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual(
      'noticeAccounts/noticeAccountsDelete/pending',
    )
    expect(calls[1][0].type).toEqual(
      'noticeAccounts/noticeAccountsDelete/rejected',
    )
  })

  it('should return update noticeAccounts state', async () => {
    const state = {
      data: [
        {
          id: 'dace5413-8b79-46d8-acca-f0edee58753e',
          name: 'Test',
          keys: {
            account_id: 'test',
            phone_id: 'test',
          },
          is_enabled: false,
          provider: 'WHATSAPP',
          notification_type: 'WHATSAPP',
        },
      ],
      meta: {},
    }

    const responseMock = {
      data: {
        id: 'dace5413-8b79-46d8-acca-f0edee58753e',
        name: 'Test',
        keys: {
          account_id: 'test',
          phone_id: 'test',
        },
        is_enabled: false,
        provider: 'WHATSAPP',
        notification_type: 'WHATSAPP',
      },
      code: 0,
    }

    jest.spyOn(httpService, 'patch').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: noticeAccountsSlice.reducer })
    await store.dispatch(
      updateNoticeAccounts({
        id: '75869080',
        data: {},
      }),
    )

    const { noticeAccounts } = await store.getState()

    expect(noticeAccounts).toEqual(state)
  })

  it('should updateNoticeAccounts thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      noticeAccounts: {
        data: [],
        meta: {},
      },
      noticeAccount: {
        isSuccess: false,
      },
      config: {},
    }
    const thunk = updateNoticeAccounts()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual(
      'noticeAccounts/updateNoticeAccounts/pending',
    )
    expect(calls[1][0].type).toEqual(
      'noticeAccounts/updateNoticeAccounts/rejected',
    )
  })

  it('should handle resetNoticeAccounts', () => {
    const state = {
      noticeAccount: { id: 1 },
    }
    const actualState = noticeAccountReducer(state, resetNoticeAccounts())

    expect(actualState.noticeAccount).toEqual({})
  })
})
