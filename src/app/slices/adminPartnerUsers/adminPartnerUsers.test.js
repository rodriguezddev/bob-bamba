import { configureStore } from '@reduxjs/toolkit'
import adminPartnerUsersReducer, {
  getAdminsPartnerUsers,
  adminPartnerUsersSlice,
  createAdminsPartnerUsers,
} from './adminPartnerUsersSlice'
import httpService from '../../services/api_services/HttpService'

describe('UserSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(adminPartnerUsersReducer(undefined, { type: 'unknown' })).toEqual({
      adminPartnerUsers: {
        data: [],
        meta: {},
      },
      adminPartnerUser: {
        isSuccess: false,
      },
    })
  })

  it('should return admins partner users', async () => {
    const responseMock = {
      data: [
        {
          id: '998f2947-1e24-40da-92aa-6c575486a4e0',
          name: 'Acton Baker',
          lastname: 'Barber',
          second_lastname: 'Frazier',
          email: 'rodago_x@hotmail.com',
          partner: {
            id: '998f2946-f6c7-46ec-a733-067eb30b79c1',
            name: 'Serrano Carroll Plc',
            code: 'SERRANO-CARROLL-PLC',
            type: 'AGGREGATOR',
            meta: null,
          },
        },
        {
          id: '99adeebf-0f8d-4f56-a13a-975bcb29d57c',
          name: 'Alberto',
          lastname: 'Ramírez',
          second_lastname: null,
          email: 'carlos@vivebamba.com',
          partner: {
            id: '99adeebe-edd7-4ecf-a268-9bc88af19d53',
            name: "Camara's org",
            code: 'CAMARAS-ORG',
            type: 'AGGREGATOR',
            meta: null,
          },
        },
      ],
      links: {
        first:
          'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=7',
        prev: null,
        next: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=2',
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 7,
        links: [
          {
            url: null,
            label: '&laquo; Anterior',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=1',
            label: '1',
            active: true,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=2',
            label: '2',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users',
        per_page: 10,
        to: 10,
        total: 61,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: adminPartnerUsersSlice.reducer })
    await store.dispatch(getAdminsPartnerUsers())

    const { adminPartnerUsers } = await store.getState()

    expect(adminPartnerUsers).toEqual(responseMock)
  })

  it('should  get admins partner users thunk request', async () => {
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
    const thunk = getAdminsPartnerUsers()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/adminsPartnerUsers/pending')
    expect(calls[1][0].type).toEqual('list/adminsPartnerUsers/rejected')
  })

  it('should return create admins partner users state', async () => {
    const stateAdmins = {
      data: [
        {
          id: '99738b76-0635-4666-8b89-277cdd851b32',
          name: 'Admin',
          lastname: 'Prueba',
          second_lastname: 'Prueba',
          email: 'admin-prueba@gmail.com',
          partner: {
            id: '93efc473-ef0b-41b8-98ca-11b326b5aade',
            name: 'ALIADA',
            code: 'ALIADA',
            type: 'AGGREGATOR',
            meta: null,
          },
        },
      ],
      meta: {},
    }

    const stateAdmin = {
      id: '99738b76-0635-4666-8b89-277cdd851b32',
      name: 'Admin',
      lastname: 'Prueba',
      second_lastname: 'Prueba',
      email: 'admin-prueba@gmail.com',
      partner: {
        id: '93efc473-ef0b-41b8-98ca-11b326b5aade',
        name: 'ALIADA',
        code: 'ALIADA',
        type: 'AGGREGATOR',
        meta: null,
      },
      isSuccess: true,
    }

    const responseMock = {
      data: {
        id: '99738b76-0635-4666-8b89-277cdd851b32',
        name: 'Admin',
        lastname: 'Prueba',
        second_lastname: 'Prueba',
        email: 'admin-prueba@gmail.com',
        partner: {
          id: '93efc473-ef0b-41b8-98ca-11b326b5aade',
          name: 'ALIADA',
          code: 'ALIADA',
          type: 'AGGREGATOR',
          meta: null,
        },
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: adminPartnerUsersSlice.reducer })
    await store.dispatch(createAdminsPartnerUsers({}))

    const { adminPartnerUsers, adminPartnerUser } = await store.getState()

    expect(adminPartnerUsers).toEqual(stateAdmins)
    expect(adminPartnerUser).toEqual(stateAdmin)
  })

  it('should create create admins partner request', async () => {
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
    const thunk = createAdminsPartnerUsers()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual(
      'adminsPartnerUsers/createAdminsPartnerUsers/pending',
    )
    expect(calls[1][0].type).toEqual(
      'adminsPartnerUsers/createAdminsPartnerUsers/rejected',
    )
  })
})
