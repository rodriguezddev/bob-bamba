// date format is "en-GB" to show two digits in the day and thus continue with the standard format
export const formatDate = (date, dateFormatType = 'en-GB') => {
  const newDate = new Date(date)

  return new Intl.DateTimeFormat(dateFormatType).format(newDate)
}

export const formatCodePartner = (inputValue) => {
  const normalizedValue = inputValue
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const trimmedValue = normalizedValue.trim()
  const code = trimmedValue.replace(/[^\w\s-]|_/g, '')

  return code.replace(/\s+/g, '-')
}
