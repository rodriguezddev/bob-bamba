/// <reference types="cypress" />

describe('Create users view', () => {
  it('Show create users page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get(
      ':nth-child(1) > .MuiTableCell-alignCenter > .MuiGrid-container > :nth-child(3) > .MuiButtonBase-root > [data-testid="GroupAddIcon"]',
    ).click()
    cy.get('[data-testid="title-createUsers"]').should(
      'contain',
      'Crear usuarios',
    )
  })

  it('check input file', () => {
    cy.get('input[type=file]').first().should('be.hidden')
  })
})
