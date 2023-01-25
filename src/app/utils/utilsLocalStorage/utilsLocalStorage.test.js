import * as utilsLocalStorage from '.'

describe('test functions utils local storage', () => {
  const localStorageMethods = () => {
    let store = {}

    return {
      getItem(key) {
        return store[key]
      },

      setItem(key, value) {
        store[key] = value
      },

      clear() {
        store = {}
      },

      removeItem(key) {
        delete store[key]
      },

      getAll() {
        return store
      },
    }
  }

  it('should return local storage empty', async () => {
    expect(utilsLocalStorage.loadState()).toEqual({})
  })

  it('should return local storage data', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMethods(),
    })

    const setLocalStorage = (data) => {
      window.localStorage.setItem('persist:root', JSON.stringify(data))
    }

    const localStorageData = { auth: 'bamba' }
    setLocalStorage(localStorageData)

    expect(utilsLocalStorage.loadState()).toEqual(localStorageData)
  })
})
