import { configureStore } from '@reduxjs/toolkit'
import recoveryMessageReducer, {
  getTemplates,
  sendRecoveryMessage,
  recoveryMessageSlice,
  resetRecoveryMessage,
} from './recoveryMessageSlice'
import httpService from '../../services/api_services/HttpService'

describe('recoveryMessageSlice redux', () => {
  const initialState = {
    message: {
      data: {},
      isSuccess: false,
    },
    templates: {},
  }
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(recoveryMessageReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    )
  })
  it('should return template state', async () => {
    const responseMock = {
      code: 0,
      data: {
        use_options_message: {
          text: 'Estas son las opciones que tienes para hacer uso del agente:',
          language: 'es_MX',
          number_parameters: 0,
        },
      },
    }

    const state = {
      use_options_message: {
        text: 'Estas son las opciones que tienes para hacer uso del agente:',
        language: 'es_MX',
        number_parameters: 0,
      },
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: recoveryMessageSlice.reducer })
    await store.dispatch(getTemplates())

    const { templates } = await store.getState()

    expect(templates).toEqual(state)
  })

  it('should get template thunk request', async () => {
    const dispatch = jest.fn()
    const thunk = getTemplates()

    await thunk(dispatch, () => initialState, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('recoveryMessage/template/pending')
    expect(calls[1][0].type).toEqual('recoveryMessage/template/rejected')
  })

  it('should response sendRecoveryMessage', async () => {
    const formData = {}
    const responseMock = {}
    const state = {
      data: {},
      isSuccess: true,
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: recoveryMessageSlice.reducer })

    await store.dispatch(sendRecoveryMessage(formData))

    const { message } = await store.getState()

    expect(message).toEqual(state)
  })

  it('should post send message thunk request', async () => {
    const dispatch = jest.fn()
    const thunk = sendRecoveryMessage()

    await thunk(dispatch, () => initialState, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('recoveryMessage/sendMessage/pending')
    expect(calls[1][0].type).toEqual('recoveryMessage/sendMessage/rejected')
  })

  it('should handle resetRecoveryMessage', () => {
    const state = {
      templates: {},
      message: {
        data: {},
        isSuccess: true,
      },
    }
    const actualState = recoveryMessageReducer(state, resetRecoveryMessage())

    expect(actualState.message).toEqual({ data: {}, isSuccess: false })
  })
})
