import { configureStore } from '@reduxjs/toolkit'
import userReducer, {
  adminSlice,
  createAdmin,
  deleteAdmins,
  getAdmins,
  resetAdmin,
  resetDeleteAdmin,
  updateAdmin,
} from './adminSlice'
import httpService from '../../services/api_services/HttpService'

describe('UserSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      admins: {
        data: [],
        meta: {},
        createAdmins: {},
        deleteAdmin: {},
      },
      admin: {},
    })
  })

  it('should return admin state', async () => {
    const responseMock = {
      data: [
        {
          id: 'e58a18e2-e979-4819-b5a9-fd056069fcbc',
          name: 'Areli',
          lastname: 'Prueba',
          email: 'areli-admin-uno@gmail.com',
        },
        {
          id: '3ce52a46-5676-4058-9f40-2e0f4f82a0bc',
          name: 'Bamba',
          lastname: 'Admin',
          email: 'admin@vivebamba.com',
        },
        {
          id: 'a0824b3b-3564-46fc-b05d-0838131f4717',
          name: 'Nuevo',
          lastname: 'Admin',
          email: 'nn@gmail.com',
        },
      ],
      links: {
        first:
          'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins?page=1',
        last: 'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins?page=1',
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
          },
          {
            url: 'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins?page=1',
            label: '1',
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
          },
        ],
        path: 'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins',
        per_page: 10,
        to: 3,
        total: 3,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: adminSlice.reducer })
    await store.dispatch(getAdmins())

    const { admins } = await store.getState()

    expect(admins).toEqual(responseMock)
  })

  it('should  get admins thunk request', async () => {
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
    const thunk = getAdmins()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/admins/pending')
    expect(calls[1][0].type).toEqual('list/admins/rejected')
  })

  it('should return create admin state', async () => {
    const stateAdmins = {
      createAdmins: {},
      data: [
        {
          id: '11532656-6aa4-427c-833a-c240d2fbca1d',
          name: 'Antonio',
          lastname: 'Prueba',
          email: 'daniel@hotmail.com',
          active: null,
        },
      ],
      deleteAdmin: {},
      meta: {},
    }
    const stateAdmin = {
      id: '11532656-6aa4-427c-833a-c240d2fbca1d',
      name: 'Antonio',
      lastname: 'Prueba',
      email: 'daniel@hotmail.com',
      active: null,
    }
    const responseMock = {
      data: {
        id: '11532656-6aa4-427c-833a-c240d2fbca1d',
        name: 'Antonio',
        lastname: 'Prueba',
        email: 'daniel@hotmail.com',
        active: null,
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: adminSlice.reducer })
    await store.dispatch(createAdmin({}))

    const { admins, admin } = await store.getState()

    expect(admins).toEqual(stateAdmins)
    expect(admin).toEqual(stateAdmin)
  })

  it('should create admin thunk request', async () => {
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
    const thunk = createAdmin()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('admin/createAdmin/pending')
    expect(calls[1][0].type).toEqual('admin/createAdmin/rejected')
  })
  it('should return delete admin state', async () => {
    const stateAdmins = {
      createAdmins: {},
      data: [],
      deleteAdmin: { isSuccess: true },
      meta: {},
    }

    const responseMock = {
      data: {},
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: adminSlice.reducer })
    await store.dispatch(deleteAdmins({ id: '11532656' }))

    const { admins } = await store.getState()

    expect(admins).toEqual(stateAdmins)
  })

  it('should delete admin thunk request', async () => {
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
    const thunk = deleteAdmins()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('delete/admins/pending')
    expect(calls[1][0].type).toEqual('delete/admins/rejected')
  })

  it('should handle resetAdmin', () => {
    const state = {
      admin: { id: 1 },
    }
    const actualState = userReducer(state, resetAdmin())

    expect(actualState.admin).toEqual({})
  })

  it('should handle resetDeleteAdmin', () => {
    const state = {
      admins: {
        data: [],
        meta: {},
        createAdmins: {},
        deleteAdmin: { id: 1 },
      },
    }
    const actualState = userReducer(state, resetDeleteAdmin())

    expect(actualState.admins.deleteAdmin).toEqual({})
  })

  it('should return update admin state', async () => {
    const responseMock = {
      data: {
        id: 'bf27b918-19eb-4bca-8bb6-8291428eca22',
        name: 'Aarón',
        lastname: 'Camacho',
        email: 'aaron@vivebamba.com',
        active: null,
      },
    }

    const state = {
      data: [
        {
          id: 'bf27b918-19eb-4bca-8bb6-8291428eca22',
          name: 'Aarón',
          lastname: 'Camacho',
          email: 'aaron@vivebamba.com',
          active: null,
        },
      ],
      meta: {},
      createAdmins: {},
      deleteAdmin: {},
    }

    jest.spyOn(httpService, 'patch').mockResolvedValueOnce(responseMock)

    const store = configureStore({
      reducer: adminSlice.reducer,
    })
    await store.dispatch(
      updateAdmin({
        id: 'dac3e',
        data: {},
      }),
    )

    const { admins } = await store.getState()
    expect(admins).toEqual(state)
  })

  it('should update admin thunk request', async () => {
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
    const thunk = updateAdmin()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('update/admin/pending')
    expect(calls[1][0].type).toEqual('update/admin/rejected')
  })
})
