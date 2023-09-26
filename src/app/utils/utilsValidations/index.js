import { subYears } from 'date-fns'

export const getEmailPattern = () => {
  const emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return {
    message: 'Ingrese un email válido',
    value: emailAddressRegex,
  }
}

export const getPasswordPattern = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

  return {
    message:
      'El password debe contener entre 8 y 20 caracteres, al menos una letra mayúscula, una letra minúscula y un dígito.',
    value: passwordRegex,
  }
}

export const getRfcPattern = () => {
  const rfcRegex = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/

  return {
    message: 'Ingresa un RFC válido',
    value: rfcRegex,
  }
}

export const getPhonePattern = () => {
  const phoneRegex = /^\d{10}$/

  return {
    message: 'Ingresa un número válido a 10 dígitos',
    value: phoneRegex,
  }
}

export const getRepeatPasswordValidation = (valueToCompare) => {
  const errorMessage = 'Las contraseñas no coinciden'

  return (value) => value === valueToCompare || errorMessage
}

export const getDateformat = () => {
  const regEx = /^\d{4}\/\d{2}\/\d{2}$/

  return {
    message: 'Ingresa una fecha válida yyyy/mm/dd',
    value: regEx,
  }
}

export const getCodePattern = () => {
  const regEx = /^\S{1,}$/

  return {
    message: 'El código no debe contener espacios ej. MI-CODIGO-PARTNER',
    value: regEx,
  }
}

export const getSkuProduct = () => {
  const skuRegex = /^(?!.*[-_]{2,})(?![_-])(?!.*[_-]$)[a-zA-Z0-9][-_a-zA-Z0-9]{6,14}[a-zA-Z0-9]$/

  return {
    message: 'El sku debe tener el siguiente formato ej. BAMBA-SEGURO',
    value: skuRegex,
  }
}

export const getCurpPattern = () => {
  const curpRegex = /^[A-Z]{4}\d{6}[H,M][A-Z]{5}[A-Z0-9]{2}$/

  return {
    message: 'Ingresa un CURP válido',
    value: curpRegex,
  }
}

export const validationLegalAge = (date) => subYears(date, 18)

export const defaultResetInput = {
  keepErrors: true,
  keepDirty: true,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
}

export const getUrlPattern = () => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/

  return {
    message: 'Ingresa una URL válida (ftp, http o https).',
    value: urlRegex,
  }
}

export const getFilterPattern = () => {
  const filterRegex = /^[a-zA-Z0-9_-]+$/;

  return {
    value: filterRegex,
    message: 'El campo debe contener solo letras, números, guiones y guiones bajos',
  }
}
