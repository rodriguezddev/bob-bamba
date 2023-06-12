/// <reference types="cypress" />

describe('List notice accounts template view', () => {
  it('display list admin users success', () => {
    cy.clearLocalStorage()
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Notificaciones"] ').should(
      'contain',
      'Notificaciones',
    )
    cy.get('[data-testid="drawer-item-Notificaciones"] ').first().click()
    cy.get('[data-testid="button-redirect-noticeAccount"]').click()
    cy.get('[data-testid="button-redirect-noticeAccount-template"]').click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre',
    )
    cy.get('.MuiTableRow-root > :nth-child(2)').should('contain', 'Idioma')
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Contenido',
    )
  })
  it('use filters', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#name').type('Cypress')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Cypress',
    )
  })

  it('show template description', () => {
    cy.get('[data-testid="link-content-template-Cypress test"]').click()
    cy.get('[data-testid="title-alert-Contenido"]').should(
      'contain',
      'Contenido',
    )
    cy.get('[data-testid="close-button-alert"]').click()
  })

  it('show template delete', () => {
    cy.get('.MuiButtonBase-root > img').click()
    cy.get(
      '[data-testid="title-alert-¿Quieres eliminar a Cypress test?"]',
    ).should('contain', '¿Quieres eliminar a Cypress test?')
    cy.get('[data-testid="close-button-alert"]').click()
  })

  it('show template update', () => {
    cy.wait(1000)
    cy.get('[data-testid="BorderColorIcon"]').first().click()
    cy.get('[data-testid="close-button-alert"]').click()
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
