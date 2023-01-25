/// <reference types="cypress" />

describe('List users view', () => {
  it('display list users success', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del colaborador',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Email',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'RFC',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'CURP',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Fecha de nacimiento',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should(
      'contain',
      'Acciones',
    )
  })

  it('use filters', () => {
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#email').type('prueba2@gmail.com')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get(':nth-child(1) > :nth-child(1) > .css-bns4tv > .MuiBox-root').should(
      'contain',
      'Alex Prueba',
    )
  })

  it('check pagination', () => {
    cy.get('[data-testid="button-filter-clean"]').click()
    cy.get('[data-testid="LastPageIcon"]').click()
    cy.get('[aria-label="last page"]').should('be.disabled')
    cy.get('[aria-label="first page"]').click()
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
