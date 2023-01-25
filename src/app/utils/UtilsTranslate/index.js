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
