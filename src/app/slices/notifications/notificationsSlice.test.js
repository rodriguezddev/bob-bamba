import { configureStore } from '@reduxjs/toolkit'
import notificationReducer, {
  createNotification,
  deleteNotification,
  getNotifications,
  notificationSlice,
  resetNotification,
} from './notificationsSlice'
import httpService from '../../services/api_services/HttpService'

describe('NotificationSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(notificationReducer(undefined, { type: 'unknown' })).toEqual({
      notifications: {
        data: [],
        meta: {},
        deleteNotification: {},
      },
      notification: {},
      eventModels: {},
      templates: {},
    })
  })

  it('should return notification state', async () => {
    const responseMock = {
      data: [
        {
          id: 'cf2dffe7-2b3d-4fbb-a9bf-532c60b49df7',
          name: 'test notification 4',
          model_type: 'subscription',
          event_type: 'ACTIVATED',
          template: 'aviso_actualizacion_beneficios',
          template_lang: 'en_US',
          meta: {
            subject: 'hey',
            important: false,
          },
          partner: {
            id: '6794d758-a99d-41ef-9e8b-a9ad29e73d12',
            name: 'Angela Benson',
            code: 'ILLO-FUGA',
            type: 'DISTRIBUTOR',
            meta: null,
          },
          notice_account: {
            id: '50e6cbd4-6a13-4cf7-ab8b-063c314362fc',
            name: 'Bamba (5561190995)',
            keys: {
              phone_id: '112798028393815',
              account_id: '116616088008300',
            },
            is_enabled: true,
            provider: 'WHATSAPP',
            notification_type: 'WHATSAPP',
          },
        },
      ],
      links: {
        first:
          'http://staging.bamba.tech/admin/api/v1/notification-configurations?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/notification-configurations?page=1',
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
            url: 'http://staging.bamba.tech/admin/api/v1/notification-configurations?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/notification-configurations',
        per_page: 10,
        to: 1,
        total: 1,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: notificationSlice.reducer })
    await store.dispatch(getNotifications())

    const { notifications } = await store.getState()

    expect(notifications).toEqual(responseMock)
  })

  it('should get notifications thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      notifications: {
        data: [],
        meta: {},
        deleteNotification: {},
      },
      notification: {},
      eventModels: {},
      configuration: {},
      accounts: [],
      templates: {},
    }

    const thunk = getNotifications()

    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/notifications/pending')
    expect(calls[1][0].type).toEqual('list/notifications/rejected')
  })

  it('should return create notification state', async () => {
    const formValue = {
      name: 'test 1',
      template: 'guardar_numero',
      template_lang: 'es_MX',
      event_model: 'subscription_activated',
      partner_id: '4bc8032d-b758-473b-91b9-2f3206419378',
      notice_account_id: '50e6cbd4-6a13-4cf7-ab8b-063c314362fc',
      meta: {},
    }

    const stateNotifications = {
      data: [
        {
          id: '1b3150d9-8654-477e-ac08-035f245da0ed',
          name: 'test 1',
          model_type: 'subscription',
          event_type: 'ACTIVATED',
          template: 'guardar_numero',
          template_lang: 'es_MX',
          meta: [],
          partner: {
            id: '4bc8032d-b758-473b-91b9-2f3206419378',
            name: 'Bamba',
            code: 'BAMBA',
            type: 'SPONSOR',
            meta: null,
          },
          notice_account: {
            id: '50e6cbd4-6a13-4cf7-ab8b-063c314362fc',
            name: 'Bamba (5561190995)',
            keys: {
              phone_id: '112798028393815',
              account_id: '116616088008300',
            },
            is_enabled: true,
            provider: 'WHATSAPP',
            notification_type: 'WHATSAPP',
          },
        },
      ],
      meta: {},
      deleteNotification: {},
    }

    const responseMock = {
      data: {
        id: '1b3150d9-8654-477e-ac08-035f245da0ed',
        name: 'test 1',
        model_type: 'subscription',
        event_type: 'ACTIVATED',
        template: 'guardar_numero',
        template_lang: 'es_MX',
        meta: [],
        partner: {
          id: '4bc8032d-b758-473b-91b9-2f3206419378',
          name: 'Bamba',
          code: 'BAMBA',
          type: 'SPONSOR',
          meta: null,
        },
        notice_account: {
          id: '50e6cbd4-6a13-4cf7-ab8b-063c314362fc',
          name: 'Bamba (5561190995)',
          keys: {
            phone_id: '112798028393815',
            account_id: '116616088008300',
          },
          is_enabled: true,
          provider: 'WHATSAPP',
          notification_type: 'WHATSAPP',
        },
      },
      code: 0,
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: notificationSlice.reducer })
    await store.dispatch(createNotification(formValue))

    const { notifications } = await store.getState()

    expect(notifications).toEqual(stateNotifications)
  })

  it('should createNotifications thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      notifications: {
        data: [],
        meta: {},
        deleteNotification: {},
      },
      notification: {},
    }
    const thunk = createNotification()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('notification/create/pending')
    expect(calls[1][0].type).toEqual('notification/create/rejected')
  })

  it('should handle resetNotification', () => {
    const state = {
      notifications: {
        data: [],
        meta: {},
        deleteNotification: {},
      },
      notification: {},
    }

    const actualState = notificationReducer(state, resetNotification())

    expect(actualState.notification).toEqual({})
  })

  it('should return delete notification state', async () => {
    const stateNotifications = {
      data: [],
      meta: {},
      deleteNotification: { isSuccess: true },
    }

    const responseMock = {
      data: {},
    }

    jest.spyOn(httpService, 'delete').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: notificationSlice.reducer })
    await store.dispatch(
      deleteNotification({ id: '4bc8032d-b758-473b-91b9-2f3206419378' }),
    )

    const { notifications } = await store.getState()

    expect(notifications).toEqual(stateNotifications)
  })

  it('should delete notification thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      notifications: {
        data: [],
        meta: {},
        deleteNotification: {},
      },
      notification: {},
      eventModels: {},
      templates: {},
    }

    const thunk = deleteNotification()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('notifications/delete/pending')
    expect(calls[1][0].type).toEqual('notifications/delete/rejected')
  })

  it('should return event models state', async () => {
    const responseMock = {
      code: 0,
      data: {
        subscription_activated: 'Activacion de subscripcion',
      },
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: notificationSlice.reducer })
    await store.dispatch(getNotifications())

    const { notifications } = await store.getState()

    expect(notifications).toEqual(responseMock)
  })
})
