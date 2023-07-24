/// <reference types="cypress" />

describe('Message view', () => {
  it('display list message', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Mensajes"]').first().click()
    cy.get('[data-testid="drawer-item-Mensajes"]').should('contain', 'Mensajes')
    cy.get('[data-testid="drawer-item-Mensajes"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Clave del mensaje',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Partner',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Mensaje',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Acciones',
    )
  })

  it('check pagination', () => {
    cy.get('[data-testid="drawer-item-Mensajes"]').first().click()
    cy.get('[data-testid="LastPageIcon"]').click()
    cy.get('[data-testid="close-button-alert"]').click()
    cy.get('[aria-label="last page"]').should('be.disabled')
    cy.get('[aria-label="first page"]').click()
    cy.get('[aria-label="first page"]').should('be.disabled')
  })

  it('use filters message', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#fieldFilter').click()
    cy.get('[data-testid="select-filter-value-welcome"]').click()
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Bienvenida',
    )
  })
})
