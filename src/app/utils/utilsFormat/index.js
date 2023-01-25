// date format is "en-GB" to show two digits in the day and thus continue with the standard format
export const formatDate = (date, dateFormatType = 'en-GB') => {
  const newDate = new Date(date)

  return new Intl.DateTimeFormat(dateFormatType).format(newDate)
}
