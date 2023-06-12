import { configureStore } from '@reduxjs/toolkit'
import noticeAccountTemplateReducer, {
  noticeAccountTemplateSlice,
  getNoticeAccountTemplate,
  deleteNoticeAccountTemplate,
  createNoticeAccountTemplate,
  resetNoticeAccountTemplate,
  updateNoticeAccountTemplate,
} from './noticeAccountTemplateSlice'
import httpService from '../../services/api_services/HttpService'

describe('noticeAccountTemplateSlice redux', () => {
  it('should handle initial state', () => {
    expect(
      noticeAccountTemplateReducer(undefined, { type: 'unknown' }),
    ).toEqual({
      noticeAccountTemplates: {
        data: [],
        meta: {},
      },
      noticeAccountTemplate: {
        createTemplate: {
          isSuccess: false,
        },
      },
    })
  })

  it('should return noticeAccountTemplate state', async () => {
    const responseMock = {
      data: [
        {
          id: '702448a8-9fb5-442c-9094-cf7b2f550c85',
          name: 'prueba',
          content: 'prueba \n 😊',
          lang: 'es',
        },
      ],
      links: {
        first:
          'http://staging.bamba.tech/admin/api/v1/notice-account-templates?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/notice-account-templates?page=1',
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
            url: 'http://staging.bamba.tech/admin/api/v1/notice-account-templates?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/notice-account-templates',
        per_page: 10,
        to: 1,
        total: 1,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({
      reducer: noticeAccountTemplateSlice.reducer,
    })
    await store.dispatch(getNoticeAccountTemplate())

    const { noticeAccountTemplates } = await store.getState()

    expect(noticeAccountTemplates).toEqual(responseMock)
  })

  it('should  get noticeAccountTemplate thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      noticeAccountTemplates: {
        data: [],
        meta: {},
      },
    }
    const thunk = getNoticeAccountTemplate()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/NoticeAccountTemplate/pending')
    expect(calls[1][0].type).toEqual('list/NoticeAccountTemplate/rejected')
  })

  it('should return created template', async () => {
    const formData = {
      name: 'prueba',
      content: 'prueba \n 😊',
      lang: 'es',
      notice_account_id: 'f4ba8',
    }

    const responseMock = {
      data: {
        id: 'b2f6fbc3-7453-49d1-98b3-a8f836f43cc5',
        name: 'prueba',
        content: 'prueba \n 😊',
        lang: 'es',
        notice_account: {
          id: 'f4bc41f7-926d-479f-8a86-484a876fd0a8',
          name: 'Testing (5550487249)',
          keys: {
            token: 'EAAIPZD',
            phone_id: '113982561581436',
            account_id: '115951744716826',
          },
          is_enabled: true,
          provider: 'WHATSAPP',
          notification_type: 'WHATSAPP',
        },
      },
      code: 0,
    }

    const state = {
      id: 'b2f6fbc3-7453-49d1-98b3-a8f836f43cc5',
      name: 'prueba',
      content: 'prueba \n 😊',
      lang: 'es',
      notice_account: {
        id: 'f4bc41f7-926d-479f-8a86-484a876fd0a8',
        name: 'Testing (5550487249)',
        keys: {
          token: 'EAAIPZD',
          phone_id: '113982561581436',
          account_id: '115951744716826',
        },
        is_enabled: true,
        provider: 'WHATSAPP',
        notification_type: 'WHATSAPP',
      },
      createTemplate: {
        isSuccess: true,
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)
    const store = configureStore({
      reducer: noticeAccountTemplateSlice.reducer,
    })

    await store.dispatch(createNoticeAccountTemplate(formData))

    const { noticeAccountTemplate } = await store.getState()

    expect(noticeAccountTemplate).toEqual(state)
  })

  it('should create template thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      noticeAccountTemplates: {
        data: [],
        meta: {},
      },
      noticeAccountTemplate: {
        createTemplate: {
          isSuccess: false,
        },
      },
    }

    const thunk = createNoticeAccountTemplate()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('create/NoticeAccountTemplate/pending')
    expect(calls[1][0].type).toEqual('create/NoticeAccountTemplate/rejected')
  })

  it('should handle resetNoticeAccountTemplate', () => {
    const state = {
      noticeAccountTemplates: {
        data: [],
        meta: {},
      },
      noticeAccountTemplate: {
        id: 'b2f6fbc3-7453-49d1-98b3-a8f836f43cc5',
        name: 'prueba',
        content: 'prueba \n 😊',
        lang: 'es',
        notice_account: {
          id: 'f4bc41f7-926d-479f-8a86-484a876fd0a8',
          name: 'Testing (5550487249)',
          keys: {
            token: 'EAAIPZD',
            phone_id: '113982561581436',
            account_id: '115951744716826',
          },
          is_enabled: true,
          provider: 'WHATSAPP',
          notification_type: 'WHATSAPP',
        },
        createTemplate: {
          isSuccess: true,
        },
      },
    }
    const resetState = {
      createTemplate: {
        isSuccess: false,
      },
    }

    const actualState = noticeAccountTemplateReducer(
      state,
      resetNoticeAccountTemplate(),
    )

    expect(actualState.noticeAccountTemplate).toEqual(resetState)
  })

  it('should return delete noticeAccountsTemplate state', async () => {
    const state = {
      data: [],
      meta: {
        total: 0,
      },
    }

    const responseMock = {
      data: [],
    }

    jest.spyOn(httpService, 'delete').mockResolvedValueOnce(responseMock)

    const store = configureStore({
      reducer: noticeAccountTemplateSlice.reducer,
    })
    await store.dispatch(
      deleteNoticeAccountTemplate({ id: '75869080', name: 'test' }),
    )

    const { noticeAccountTemplates } = await store.getState()

    expect(noticeAccountTemplates).toEqual(state)
  })

  it('should delete noticeAccountTemplate thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      noticeAccountTemplates: {
        data: [],
        meta: {},
      },
      noticeAccountTemplate: {
        createTemplate: {
          isSuccess: false,
        },
      },
    }

    const thunk = deleteNoticeAccountTemplate()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls[0][0].type).toEqual('delete/noticeAccountTemplate/pending')
    expect(calls[1][0].type).toEqual('delete/noticeAccountTemplate/rejected')
  })

  it('should return update noticeAccountTemplate state', async () => {
    const responseMock = {
      data: {
        id: '815b',
        name: 'Test',
        content: 'Test',
        lang: 'es',
        notice_account: {
          id: 'f4a8',
          name: 'Testing',
          keys: {
            token: '',
            phone_id: '113982561581436',
            account_id: '115951744716826',
          },
          is_enabled: true,
          provider: 'WHATSAPP',
          notification_type: 'WHATSAPP',
        },
      },
      code: 0,
    }

    const state = {
      data: [
        {
          id: '815b',
          name: 'Test',
          content: 'Test',
          lang: 'es',
          notice_account: {
            id: 'f4a8',
            name: 'Testing',
            keys: {
              token: '',
              phone_id: '113982561581436',
              account_id: '115951744716826',
            },
            is_enabled: true,
            provider: 'WHATSAPP',
            notification_type: 'WHATSAPP',
          },
        },
      ],
      meta: {},
    }

    jest.spyOn(httpService, 'patch').mockResolvedValueOnce(responseMock)

    const store = configureStore({
      reducer: noticeAccountTemplateSlice.reducer,
    })
    await store.dispatch(
      updateNoticeAccountTemplate({
        id: 'dac3e',
        data: {},
      }),
    )

    const { noticeAccountTemplates } = await store.getState()

    expect(noticeAccountTemplates).toEqual(state)
  })

  it('should update noticeAccountTemplate thunk request', async () => {
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
    const thunk = updateNoticeAccountTemplate()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('update/NoticeAccountTemplate/pending')
    expect(calls[1][0].type).toEqual('update/NoticeAccountTemplate/rejected')
  })
})
