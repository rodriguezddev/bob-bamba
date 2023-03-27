import { errorsConstants } from '../../slices/constants/errorsConstants'

export const getTypePartner = (type) => {
  const typePartner = {
    AGGREGATOR: 'Agregador',
    DISTRIBUTOR: 'Distribuidor',
    SPONSOR: 'Sponsor',
  }

  return typePartner[type]
}

export const formatCurrency = (amount, language = 'es-MX') => new Intl.NumberFormat(language, {
  maximumFractionDigits: 2,
}).format(amount)

export const getStatusProducts = (status) => {
  const statusProducts = {
    ACTIVE: 'Activo',
    CANCELED: 'Cancelado',
    INACTIVE: 'Inactivo',
    OUT_STOCK: 'Fuera de stock',
  }

  return statusProducts[status] || '-'
}

export const getPeriodProducts = (period) => {
  const statusPeriod = {
    DAY: 'Día',
    WEEKLY: 'Semana',
    MONTHLY: 'Mes',
    ANNUAL: 'Año',
  }

  return statusPeriod[period] || '-'
}

export const getPeriodSubscriptions = (period, every = 0) => {
  const statusPeriod = {
    DAY: `${every} Día${every > 1 ? 'es' : ''}`,
    WEEKLY: `${every} Semana${every > 1 ? 'es' : ''}`,
    MONTHLY: `${every} Mes${every > 1 ? 'es' : ''}`,
    ANNUAL: `${every} Año${every > 1 ? 's' : ''}`,
  }

  return statusPeriod[period] || '-'
}

export const handleErrorMessage = (errors) => {
  if (!errors) return null

  const errorMessage = Object.values(errors).map(
    (error) => errorsConstants[error] || error,
  )

  return errorMessage.join(' ')
}

export const getTextErrorUploadFile = (error) => errorsConstants[error] || error

export const getTextActionUploadFile = (action) => {
  const actionText = {
    CANCELED: 'Baja',
    REGISTRATION: 'Alta',
  }

  return actionText[action] || action
}

export const handleTextClipping = (text, maxLength) => (text && text.length > maxLength
  ? text.slice(0, maxLength).split(' ').slice(0, -1).join(' ')
  : text)
