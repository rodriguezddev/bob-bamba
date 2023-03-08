export const usersWithoutEmailAndCellphone = (users) => users
  .filter((user) => !user.phone && !user.email)
  .map((infoUser) => ({
    ...infoUser,
    error: 'Debe contener email o celular',
  }))
