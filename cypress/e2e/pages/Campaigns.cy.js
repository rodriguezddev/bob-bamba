/// <reference types="cypress" />

describe('Campaigns view', () => {
  it('display list campaigns', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Campañas"]').should('contain', 'Campañas')
    cy.get('[data-testid="drawer-item-Campañas"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre de la cuenta',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Fecha de envío',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Plantilla',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Idioma de la plantilla',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Estatus',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should(
      'contain',
      'Acciones',
    )
  })

  it('use filters campaigns', () => {
    cy.intercept('/admin/api/v1/newsletter-messages').as('getCampaigns')
    cy.wait('@getCampaigns')
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#send_date').type('2023-04-26')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      '26-04-2023 01:00',
    )
  })

  it('check pagination', () => {
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
