/// <reference types="cypress" />

describe('users details view', () => {
  it('display user view return to list users', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('[data-testid="title-users"]').should('contain', 'Usuarios')
  })

  it('display user view success', () => {
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#email').type('testcypress@hotmail.com')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('[data-testid="icon-button-TETC880214GR6"]').click()
    cy.get(
      '.MuiGrid-direction-xs-column > [data-testid="subscriptions-title"]',
    ).should('contain', 'Suscripciones')
  })

  it('show subscriptions details', () => {
    cy.get('[data-testid="subscriptions-title"]').should(
      'contain',
      'Suscripciones',
    )
    cy.get('[data-testid="button-to-show-certificate-id-1"]').click()
    cy.get('#pdf-viewer-dialog-title').should('contain', 'Certificado')
    cy.get('[data-testid="pdf-viewer-Button-action"]').click()
  })

  it('show cancel subscription modal', () => {
    cy.get('[data-testid="subscriptions-title"]').should(
      'contain',
      'Suscripciones',
    )
    cy.get('[data-testid="button-to-cancel-subscription-id-1"]').click()
    cy.get('[data-testid="close-button-alert"]').should('contain', 'Cerrar')
    cy.get('[data-testid="close-button-alert"]').click()
  })

  it('show products details modal', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#email').type('testcypress@hotmail.com')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('[data-testid="icon-button-TETC880214GR6"]').click()
    cy.get(
      '[data-testid="button-to-show-product-DOCTOR-TELEFONO-247-details"]',
    ).click()
    cy.get('#alert-dialog-title').should(
      'contain',
      'Doctor por Teléfono 24 hrs',
    )
    cy.get('[data-testid="close-button-alert"]').click()
  })

  it('show recovery message modal', () => {
    cy.get('[data-testid="recovery-message-button"]').click()
    cy.wait(3000)
    cy.get('[data-testid="recoveryMessageForm-title"]').should(
      'contain',
      'Mensaje de recuperación',
    )
    cy.get(
      ':nth-child(5) > .MuiDialog-container > .MuiPaper-root > .MuiDialogContent-root > .MuiGrid-direction-xs-column > .MuiGrid-spacing-xs-2 > :nth-child(1) > [data-testid="cancel-recovery-message-button"]',
    )
      .first()
      .click()
    cy.get('[data-testid="navbar-logout"]').first().click()
  })

  it('show subscriptions message', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#email').type('testcypress@hotmail.com')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('[data-testid="icon-button-TETC880214GR6"]').click()
    cy.get('[data-testid="subscriptions-button"]').click()
    cy.get('[data-testid="close-button-action-alert"]').click()
    cy.get('[data-testid="navbar-logout"]').first().click()
  })
})
