/// <reference types="cypress" />

describe('Notifications view', () => {
  it('display list notifications', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Notificaciones"]').first().click()
    cy.get('[data-testid="drawer-item-Notificaciones"]').should(
      'contain',
      'Notificaciones',
    )
    cy.get('[data-testid="drawer-item-Notificaciones"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre de la notificación',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Partner',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Tipo de modelo',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Tipo de evento',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Plantilla',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should(
      'contain',
      'Idioma de la plantilla',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)').should(
      'contain',
      'Cuenta de notificación',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(8)').should(
      'contain',
      'Acciones',
    )
  })

  it('use filters notifications', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#name').type('test notification 6')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'test notification 6',
    )
    cy.get('[data-testid="button-filter-clean"]').click()
  })

  it('clear notification', () => {
    cy.get('[data-testid="button-filter-search"]').click()
  })

  it('check pagination', () => {
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
