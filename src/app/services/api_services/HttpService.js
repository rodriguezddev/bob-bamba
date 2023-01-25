import { loadState } from '../../utils/utilsLocalStorage'

class HttpService {
  get = (path) => {
    const requestOptions = {
      method: 'GET',
      headers: this.getHeaders(),
    }

    return fetch(`${process.env.REACT_APP_API_URL}${path}`, requestOptions)
      .then((response) => this.handleResponse(response))
      .then((response) => response)
  }

  post = (path, data, isFile = false) => {
    const requestOptions = {
      method: 'POST',
      headers: this.getHeaders(isFile),
      body: isFile ? data : JSON.stringify(data),
    }

    return fetch(`${process.env.REACT_APP_API_URL}${path}`, requestOptions)
      .then((response) => this.handleResponse(response))
      .then((response) => response)
  }

  patch = (path, data) => {
    const requestOptions = {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    }

    return fetch(`${process.env.REACT_APP_API_URL}${path}`, requestOptions)
      .then((response) => this.handleResponse(response))
      .then((response) => response)
  }

  put = (path, data) => {
    const requestOptions = {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    }

    return fetch(`${process.env.REACT_APP_API_URL}${path}`, requestOptions)
      .then((response) => this.handleResponse(response))
      .then((response) => response)
  }

  delete = (path, data) => {
    const requestOptions = {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    }

    return fetch(`${process.env.REACT_APP_API_URL}${path}`, requestOptions)
      .then((response) => this.handleResponse(response))
      .then((response) => response)
  }

  handleResponse = (response) => response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const obj = {
        ...data,
        status: response.status,
      }
      return Promise.reject(obj)
    }

    return data
  })

  getHeaders(isFile = false) {
    const accessToken = loadState()
    const { user } = JSON.parse(accessToken?.auth)

    if (user?.token) {
      return {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${user?.token}`,
        ...(!isFile && { 'Content-Type': 'application/json' }),
      }
    }
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }
}

const httpService = new HttpService()

export default httpService
