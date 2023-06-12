export const usersWithoutEmailAndCellphone = (users) => users
  .filter((user) => !user.phone && !user.email)
  .map((infoUser) => ({
    ...infoUser,
    error: 'Debe contener email o celular',
  }))

export const validationFileUploadUsers = (users) => {
  let userValidated = []

  users.forEach((user) => {
    let errorMessages = []

    if (!user.phone && !user.email) {
      errorMessages = [...errorMessages, 'Debe contener email o celular']
    }

    if (user.sku) {
      if (!user.birthdate || !user.rfc || !user.action) {
        errorMessages = [
          ...errorMessages,
          'Debe contener RFC, Fecha de nacimiento, Tipo de movimiento',
        ]
      }
    }

    if (errorMessages.length > 0) {
      userValidated = [
        ...userValidated,
        {
          ...user,
          error: errorMessages.join(', '),
        },
      ]
    }
  })

  return userValidated
}

export const upperCaseOrLowerCasePhone = (cellphones) => {
  let cellphonesMatch = cellphones.filter(
    (cellphone) => !cellphone.cellphoneLowercase || !cellphone.cellphoneUppercase,
  )

  if (cellphonesMatch.length === 0) {
    cellphonesMatch = [
      {
        error: 'El campo cellphone es requerido',
      },
    ]
  }

  return cellphonesMatch
}
