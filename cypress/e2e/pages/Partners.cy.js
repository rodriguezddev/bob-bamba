/// <reference types="cypress" />

describe('Partner view', () => {
  it('display list partners', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Productos"]').first().click()
    cy.get('[data-testid="drawer-item-Partners"]').should('contain', 'Partners')
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del partner',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Código',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Webhook',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Tipo',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Compañía',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should(
      'contain',
      'Acciones',
    )
  })

  it('use filters partners', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#name').type('Bamba')
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

  it('should show modal to assign products to partner ', () => {
    cy.get(
      ':nth-child(2) > .MuiTableCell-alignCenter > .MuiGrid-container > :nth-child(1) > .MuiButtonBase-root > [data-testid="PlaylistAddCircleIcon"]',
    ).click()
    cy.get('[data-testid="products-available"]').should(
      'contain',
      'Productos disponibles',
    )
    cy.get('[data-testid="card-CONSULTA-ESPECIALISTA-2"]').click()
    cy.get(
      ':nth-child(5) > .MuiDialog-container > .MuiPaper-root > #alert-dialog-title',
    ).should('contain', 'Precio del producto')
  })

  it('Show errors validations form', () => {
    cy.get('[data-testid="primary-button-form-alert"]').click()
    cy.get('[data-testid="error-message-product-price"]').should(
      'contain',
      'El precio del producto es requerido',
    )
  })

  it('Remove errors form', () => {
    cy.get('#product-price').type('1')
    cy.get('[data-testid="error-message-product-price"]').should(
      'not.have.value',
      'El precio del producto es requerido',
    )
  })

  it('should show selected products', () => {
    cy.get('[data-testid="primary-button-form-alert"]').click()
    cy.get('.MuiGrid-root > .MuiTypography-root').should(
      'not.have.value',
      'Aquí se mostraran los productos seleccionados',
    )
  })

  it('should close modal', () => {
    cy.get('[data-testid="close-button-action-alert"]').click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del partner',
    )
  })

  it('check pagination', () => {
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get('[data-testid="button-filter-clean"]').click()
    cy.get('[data-testid="close-button-alert"]').click()
    cy.get('[data-testid="LastPageIcon"]').click()
    cy.get('[aria-label="last page"]').should('be.disabled')
    cy.get('[aria-label="first page"]').click()
    cy.get('[aria-label="first page"]').should('be.disabled')
  })

  it('show products', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get(
      '[data-testid="icon-button-Aliada"] > [data-testid="VisibilityIcon"] > path',
    ).click()
    cy.get(
      '[data-testid="details-button-Seguro de Accidentes que paga hasta $100,000"]',
    ).click()
    cy.get(
      '[data-testid="title-alert-Seguro de Accidentes que paga hasta $100,000"]',
    ).should('contain', 'Seguro de Accidentes')
  })

  it('show update partner', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get(
      ':nth-child(1) > .MuiTableCell-alignCenter > .MuiGrid-container > :nth-child(2) > .MuiButtonBase-root > [data-testid="BorderColorIcon"]',
    ).click()
    cy.get('#alert-dialog-title').should('contain', 'Actualizar partner')
    cy.get('#alert-dialog-description').should(
      'contain',
      'Se actualizará el partner Agente Bamba',
    )
    cy.get('[data-testid="close-button-action-alert"]').click()
  })

  it('should show modal to add webhook ', () => {
    cy.get(
      '[data-testid="icon-button-Agente Bamba"] > [data-testid="LanguageIcon"]',
    ).click()
    cy.get('#alert-dialog-title').should(
      'contain',
      'Agrega el webhook de Agente Bamba',
    )
  })
})
