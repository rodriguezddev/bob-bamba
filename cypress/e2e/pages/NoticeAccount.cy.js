/// <reference types="cypress" />

describe('List notice accounts view', () => {
  it('display list admin users success', () => {
    cy.clearLocalStorage()
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Notificaciones"] ').should(
      'contain',
      'Notificaciones',
    )
    cy.get('[data-testid="drawer-item-Notificaciones"] ').first().click()
    cy.get('[data-testid="button-redirect-noticeAccount"]').click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Tipo de Notificación',
    )
    cy.get('.MuiTableRow-root > :nth-child(3)').should('contain', 'Proveedor')
    cy.get('.MuiTableRow-root > :nth-child(4)').should('contain', 'Habilitado')
    cy.get('.MuiTableRow-root > :nth-child(5)').should('contain', 'Acciones')
  })

  it('use filters', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#name').type('Symplifica')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Symplifica ',
    )
    cy.get('[data-testid="button-filter-clean"]').click()
  })
  it('show update modal', () => {
    cy.get(
      ':nth-child(1) > :nth-child(5) > .MuiGrid-container > :nth-child(1) > .MuiButtonBase-root > [data-testid="BorderColorIcon"]',
    ).click()
    cy.get('#alert-dialog-title').should(
      'contain',
      'Actualizar Cuenta de notificación',
    )
    cy.get('[data-testid="close-button-action-alert"]').click()
  })

  it('check pagination', () => {
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
