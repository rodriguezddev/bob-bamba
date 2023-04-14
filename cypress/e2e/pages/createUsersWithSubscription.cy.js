/// <reference types="cypress" />

describe('Create product view', () => {
  it('Show create product page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get(
      ':nth-child(1) > .MuiTableCell-alignCenter > .MuiGrid-container > :nth-child(3) > .MuiButtonBase-root > [data-testid="GroupAddIcon"]',
    )
      .first()
      .click()
    cy.get('[data-testid="title-createUsers"]').should(
      'contain',
      'Crear usuarios con suscripción',
    )
  })
})
