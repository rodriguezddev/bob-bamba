import { configureStore } from '@reduxjs/toolkit'
import authReducer, {
  authSlice, login, logout, reset,
} from './authSlice'
import httpService from '../../services/api_services/HttpService'

describe('authSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      loggedIn: false,
      user: {},
    })
  })

  it('should return user state', async () => {
    const formData = {
      email: 'ejemplo@vivebamaba.com',
      password: 'Password',
      client_id: 'xxxxxxxxxxxxxxx',
      client_secret: 'xxxxxxxxxxxxxx',
      grant_type: 'password',
    }

    const responseMock = {
      code: 0,
      data: {
        token: '1|vdzPSudEWNbiEMiqdy6Xr0iDJGXc1uxswEUD8mfm',
        user: {
          name: 'Ejemplo',
          lastname: 'Ejemplo',
          email: 'ejemplo@vivebamba.com',
        },
      },
    }

    const state = {
      token: '1|vdzPSudEWNbiEMiqdy6Xr0iDJGXc1uxswEUD8mfm',
      user: {
        name: 'Ejemplo',
        lastname: 'Ejemplo',
        email: 'ejemplo@vivebamba.com',
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: authSlice.reducer })
    await store.dispatch(login(formData))

    const { user } = await store.getState()

    expect(user).toEqual(state)
  })

  it('should return user logout state', async () => {
    const responseMock = {}

    const state = {}

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: authSlice.reducer })
    await store.dispatch(logout())

    const { user } = await store.getState()

    expect(user).toEqual(state)
  })

  it('should logout thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      user: {},
      loggedIn: false,
    }
    const thunk = logout()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('auth/logout/pending')
    expect(calls[1][0].type).toEqual('auth/logout/rejected')
  })

  it('should handle reset user', () => {
    const state = {
      user: { id: 1 },
      loggedIn: false,
    }
    const actualState = authReducer(state, reset())

    expect(actualState.user).toEqual({})
  })
})
