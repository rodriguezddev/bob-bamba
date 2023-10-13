/// <reference types="cypress" />

describe('List users view', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.login('admin@vivebamba.com', 'Password')
  })

  it('display list users success', () => {
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
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
      'Partner',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)').should(
      'contain',
      'Acepta',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(8)').should(
      'contain',
      'Acciones',
    )
  })

  it('use filters', () => {
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#email').type('testcypress@hotmail.com')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get(':nth-child(1) > :nth-child(1) > .css-bns4tv > .MuiBox-root').should(
      'contain',
      'Cypress Test',
    )
  })

  it('check pagination', () => {
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
    cy.get('[aria-label="first page"]').should('be.disabled')
    cy.get('[data-testid="LastPageIcon"]').click()
    cy.get('[aria-label="last page"]').should('be.disabled')
    cy.get('[aria-label="first page"]').click()
  })

  it('active user', () => {
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get(':nth-child(9) > .MuiTypography-root').should(
      'contain',
      'Desactivados',
    )
    cy.get(
      ':nth-child(9) > .MuiGrid-root > .MuiBox-root > .MuiInputBase-root > #fieldFilter',
    ).click()
    cy.get('[data-testid="select-filter-value-true"]').click()
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get(
      ':nth-child(1) > :nth-child(8) > .MuiGrid-container > .MuiGrid-root > .MuiButtonBase-root',
    )
      .should('contain', 'Activar')
      .click()
    cy.get('[data-testid="title-alert-Activar usuario"]').should(
      'contain',
      'Activar usuario',
    )
    cy.get('[data-testid="close-button-alert"]')
      .should('contain', 'Cancelar')
      .click()
  })
})
