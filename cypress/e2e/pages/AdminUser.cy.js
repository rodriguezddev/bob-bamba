/// <reference types="cypress" />

describe('List admin users view', () => {
  it('display list admin users success', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Administradores"]').should(
      'contain',
      'Administradores',
    )
    cy.get('[data-testid="drawer-item-Administradores"]').first().click()
    cy.intercept('/admin/api/v1/admins').as('getAdmins')
    cy.wait('@getAdmins')
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del colaborador',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Email',
    )
    cy.get('.MuiTableRow-root > :nth-child(3)').should('contain', 'Acciones')
  })

  it('use filters', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#email').type('admin@vivebamba.com')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get(':nth-child(1) > :nth-child(1) > .css-bns4tv > .MuiBox-root').should(
      'contain',
      'Bamba Admin',
    )
    cy.get('[data-testid="button-filter-clean"]').click()
  })

  it('check pagination', () => {
    cy.get('[data-testid="button-filter-clean"]').click()
    cy.get('[data-testid="LastPageIcon"]').click()
    cy.get('[aria-label="last page"]').should('be.disabled')
    cy.get('[aria-label="first page"]').click()
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
