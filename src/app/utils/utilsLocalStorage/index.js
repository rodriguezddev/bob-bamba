export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('persist:root')
    if (serializedState === null) {
      return {}
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {}
  }
}
