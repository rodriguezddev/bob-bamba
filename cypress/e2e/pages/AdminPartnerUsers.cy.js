/// <reference types="cypress" />

describe('AdminPartnerUsers view', () => {
  it('display list admin partner users', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Usuarios admin partners"]')
      .first()
      .click()
    cy.get('[data-testid="drawer-item-Usuarios admin partners"]').should(
      'contain',
      'Usuarios admin partners',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Email',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'partner',
    )
  })

  it('use filters partners', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#name').type('Test')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Bamba',
    )
  })

  it('use filters partner', () => {
    cy.get('#name').clear()
    cy.get('[data-testid="button-filter-search"]').click()
  })
})
