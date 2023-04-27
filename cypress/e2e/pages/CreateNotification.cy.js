/// <reference types="cypress" />

describe('create notification view', () => {
  it('Show create notification page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Notificaciones"]').should(
      'contain',
      'Notificaciones',
    )
    cy.get('[data-testid="drawer-item-Notificaciones"]').first().click()
    cy.get('[data-testid="button-create-notification"]').click()
    cy.get('[data-testid="title-create-notification"]').should(
      'contain',
      'Crear notificación',
    )
  })

  it('show errors validations form', () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[data-testid="error-message-notificationName"]').should(
      'contain',
      'El nombre de la notificación es requerida',
    )
    cy.get('[data-testid="error-message-partnerId"]').should(
      'contain',
      'El nombre del partner es requerido',
    )
    cy.get('[data-testid="error-message-actionType"]').should(
      'contain',
      'El tipo de acción es requerida',
    )
    cy.get('[data-testid="error-message-eventModel"]').should(
      'contain',
      'El modelo es requerido',
    )
  })

  it('remove error form', () => {
    cy.get('#notificationName').type('Notification test')
    cy.get('[data-testid="error-message-notificationName"]').should(
      'not.have.value',
      'El nombre de la notificación es requerida',
    )
    cy.get('#partnerId').click()
    cy.get('[data-value="a438caaf-9745-4b19-8498-8d99800bd664"]').click()
    cy.get('[data-testid="error-message-partnerId"]').should(
      'not.have.value',
      'El nombre del partner es requerido',
    )
    cy.get('#actionType').click()
    cy.get('[data-value="WHATSAPP"]').click()
    cy.get('[data-testid="error-message-actionType"]').should(
      'not.have.value',
      'La acción de la notificación es requerida',
    )
    cy.get('#model').click()
    cy.get('[data-value="subscription_activated"]').click()
    cy.get('[data-testid="error-message-eventModel"]').should(
      'not.have.value',
      'El modelo es requerido',
    )
  })
})
