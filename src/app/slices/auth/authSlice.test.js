import { configureStore } from '@reduxjs/toolkit'
import authReducer, { authSlice, login, logout } from './authSlice'
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
      token_type: 'Bearer',
      expires_in: 31622400,
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9s',
      refresh_token: 'def5020035cef372458012b9ea5d01fa6013',
    }

    const state = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9s',
    }

    jest.spyOn(httpService, 'loginAuth').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: authSlice.reducer })
    await store.dispatch(login(formData))

    const { user } = await store.getState()

    expect(user).toEqual(state)
  })

  it('should login thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      user: {},
      loggedIn: false,
    }
    const thunk = login()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('auth/login/pending')
    expect(calls[1][0].type).toEqual('auth/login/rejected')
  })

  it('should handle reset user', () => {
    const state = {
      user: { id: 1 },
      loggedIn: false,
    }
    const actualState = authReducer(state, logout())

    expect(actualState.user).toEqual({})
  })
})
