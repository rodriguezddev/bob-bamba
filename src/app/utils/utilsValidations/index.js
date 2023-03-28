export const getEmailPattern = () => {
  const emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return {
    value: emailAddressRegex,
    message: 'Ingrese un email válido',
  }
}

export const getPasswordPattern = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

  return {
    value: passwordRegex,
    message:
      'El password debe contener entre 8 y 20 caracteres, al menos una letra mayúscula, una letra minúscula y un dígito.',
  }
}

export const getRfcPattern = () => {
  const rfcRegex = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/

  return {
    value: rfcRegex,
    message: 'Ingresa un RFC válido',
  }
}

export const getPhonePattern = () => {
  const phoneRegex = /^\d{10}$/

  return {
    value: phoneRegex,
    message: 'Ingresa un número válido a 10 dígitos',
  }
}

export const getRepeatPasswordValidation = (valueToCompare) => {
  const errorMessage = 'Las contraseñas no coinciden'

  return (value) => value === valueToCompare || errorMessage
}

export const getDateformat = () => {
  const regEx = /^\d{4}\/\d{2}\/\d{2}$/

  return {
    value: regEx,
    message: 'Ingresa una fecha válida yyyy/mm/dd',
  }
}

export const getCodePattern = () => {
  const regEx = /^\S{1,}$/

  return {
    value: regEx,
    message: 'El código no debe contener espacios ej. mi-codigo-partner',
  }
}

export const getSkuProduct = () => {
  const skuRegex = /^(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡\-_]){1})\S{8,16}$/

  return {
    value: skuRegex,
    message: 'El sku debe tener el siguiente formato ej. BAMBA-SEGURO',
  }
}

export const defaultResetInput = {
  keepErrors: true,
  keepDirty: true,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
}
