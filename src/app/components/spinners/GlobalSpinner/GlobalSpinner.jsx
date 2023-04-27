import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'

const GlobalSpinner = () => {
  const { isLoading } = useSelector((state) => state.loading)

  return isLoading && <Spinner loading={isLoading} />
}

export default GlobalSpinner
