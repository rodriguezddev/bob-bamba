import { configureStore } from '@reduxjs/toolkit'
import campaignsReducer, {
  getCampaigns,
  createCampaign,
  campaignSlice,
  resetCampaign,
  deleteCampaign,
  assignUsers,
  updateCampaign,
} from './campaignsSlice'
import httpService from '../../services/api_services/HttpService'

describe('CampaignSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(campaignsReducer(undefined, { type: 'unknown' })).toEqual({
      campaigns: {
        data: [],
        meta: {},
        deleteCampaign: {},
      },
      campaign: {},
    })
  })

  it('should return campaigns state', async () => {
    const responseMock = {
      data: [
        {
          id: '8827daa2-78ea-4d00-af5f-c2dc7eba13c7',
          template: 'bienvenida_symplifica',
          template_lang: 'es_MX',
          account_name: 'bamba_attendance',
          send_date: '2023-03-16T06:00:00.000000Z',
          users: [],
        },
      ],
      links: {
        first:
          'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
        prev: null,
        next: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
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
            url: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=1',
            label: '1',
            active: true,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
            label: '2',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages',
        per_page: 10,
        to: 10,
        total: 15,
      },
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: campaignSlice.reducer })
    await store.dispatch(getCampaigns())

    const { campaigns } = await store.getState()

    expect(campaigns).toEqual(responseMock)
  })

  it('should get campaigns thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      campaigns: {
        data: [],
        meta: {},
        deleteCampaign: {},
      },
      campaign: {},
    }
    const thunk = getCampaigns()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/campaigns/pending')
    expect(calls[1][0].type).toEqual('list/campaigns/rejected')
  })

  it('should return create campaign state', async () => {
    const data = new FormData()

    data.append('send_date', '2023-03-16')
    data.append('account_name', 'bamba_attendance')
    data.append('template', 'bienvenida_symplifica')
    data.append('template_lang', 'es_MX')

    const responseMock = {
      data: {
        id: '3c4323f8-ec51-400d-927b-8709cd55c244',
        template: 'bienvenida_symplifica',
        template_lang: 'es_MX',
        account_name: 'bamba_attendance',
        send_date: '2023-03-16T06:00:00.000000Z',
        users: [],
      },
    }

    const state = {
      id: '3c4323f8-ec51-400d-927b-8709cd55c244',
      template: 'bienvenida_symplifica',
      template_lang: 'es_MX',
      account_name: 'bamba_attendance',
      send_date: '2023-03-16T06:00:00.000000Z',
      users: [],
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: campaignSlice.reducer })
    await store.dispatch(createCampaign(data))

    const { campaign } = await store.getState()

    expect(campaign).toEqual(state)
  })

  it('should  create campaign thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      campaigns: {
        data: [],
        meta: {},
        deleteCampaign: {},
      },
      campaign: {},
    }

    const thunk = createCampaign()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('campaigns/create/pending')
    expect(calls[1][0].type).toEqual('campaigns/create/rejected')
  })

  it('should return update campaign state', async () => {
    const data = {
      send_date: '2023-03-16',
      account_name: 'bamba_attendance',
      template_lang: 'es_MX',
      template: 'bienvenida_symplifica',
    }

    const responseMock = {
      data: {
        id: '3c4323f8-ec51-400d-927b-8709cd55c244',
        template: 'bienvenida_symplifica',
        template_lang: 'es_MX',
        account_name: 'bamba_attendance',
        send_date: '2023-03-16T06:00:00.000000Z',
        users: [],
      },
    }

    const state = {
      id: '3c4323f8-ec51-400d-927b-8709cd55c244',
      template: 'bienvenida_symplifica',
      template_lang: 'es_MX',
      account_name: 'bamba_attendance',
      send_date: '2023-03-16T06:00:00.000000Z',
      users: [],
    }

    jest.spyOn(httpService, 'patch').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: campaignSlice.reducer })
    await store.dispatch(
      updateCampaign({
        data,
        campaignId: '3c4323f8-ec51-400d-927b-8709cd55c244',
      }),
    )

    const { campaign } = await store.getState()

    expect(campaign).toEqual(state)
  })

  it('should update campaign thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      campaigns: {
        data: [],
        meta: {},
        deleteCampaign: {},
      },
      campaign: {},
    }

    const thunk = updateCampaign()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('update/updateCarrier/pending')
    expect(calls[1][0].type).toEqual('update/updateCarrier/rejected')
  })

  it('should return assign users state', async () => {
    const responseMock = {
      data: {
        id: '3c4323f8-ec51-400d-927b-8709cd55c244',
        template: 'bienvenida_symplifica',
        template_lang: 'es_MX',
        account_name: 'bamba_attendance',
        send_date: '2023-03-16T06:00:00.000000Z',
        users: [
          {
            id: '85d6cbbe-43a9-4e91-81ba-32db51b1e270',
            name: 'Conny',
            lastname: 'Codee',
            second_lastname: 'Tweedle',
            photo: null,
            birthdate: '01-01-2023',
            gender: 'F',
            email: 'ctweedle14@ehow.com',
            cellphone: '7003792887',
            tax_id: null,
            personal_id: null,
            metadata: null,
            subscriptions: [],
          },
        ],
      },
    }

    const state = {
      id: '3c4323f8-ec51-400d-927b-8709cd55c244',
      template: 'bienvenida_symplifica',
      template_lang: 'es_MX',
      account_name: 'bamba_attendance',
      send_date: '2023-03-16T06:00:00.000000Z',
      users: [
        {
          id: '85d6cbbe-43a9-4e91-81ba-32db51b1e270',
          name: 'Conny',
          lastname: 'Codee',
          second_lastname: 'Tweedle',
          photo: null,
          birthdate: '01-01-2023',
          gender: 'F',
          email: 'ctweedle14@ehow.com',
          cellphone: '7003792887',
          tax_id: null,
          personal_id: null,
          metadata: null,
          subscriptions: [],
        },
      ],
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: campaignSlice.reducer })
    await store.dispatch(
      assignUsers({ campaignId: '3c4323f8-ec51-400d-927b-8709cd55c244' }),
    )

    const { campaign } = await store.getState()

    expect(campaign).toEqual(state)
  })

  it('should  assign users thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      campaigns: {
        data: [],
        meta: {},
        deleteCampaign: {},
      },
      campaign: {},
    }

    const thunk = assignUsers()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('assignUsers/campaign/pending')
    expect(calls[1][0].type).toEqual('assignUsers/campaign/rejected')
  })

  it('should return delete admin state', async () => {
    const state = {
      data: [],
      meta: {},
      deleteCampaign: { isSuccess: true },
    }

    jest.spyOn(httpService, 'delete').mockResolvedValueOnce()

    const store = configureStore({ reducer: campaignSlice.reducer })
    await store.dispatch(deleteCampaign('8827daa2-78ea-4d00-af5f-c2dc7eba13c7'))

    const { campaigns } = await store.getState()
    expect(campaigns).toEqual(state)
  })

  it('should delete campaign thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      campaigns: {
        data: [],
        meta: {},
        deleteCampaign: {},
      },
      campaign: {},
    }

    const thunk = deleteCampaign()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('delete/campaign/pending')
    expect(calls[1][0].type).toEqual('delete/campaign/rejected')
  })

  it('should handle resetCampaign', () => {
    const state = {
      campaigns: {
        data: [],
        meta: {},
        deleteCampaign: {},
      },
      campaign: {},
    }

    const actualState = campaignsReducer(state, resetCampaign())

    expect(actualState.campaign).toEqual({})
  })
})
