export const usersWithoutEmailAndCellphone = (users) => users
  .filter((user) => !user.phone && !user.email)
  .map((infoUser) => ({
    ...infoUser,
    error: 'Debe contener email o celular',
  }))

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
