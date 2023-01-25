/// <reference types="cypress" />

describe('home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('display login', () => {
    cy.get('.MuiTypography-root').should('contain', 'PANEL')
  })

  it('shows an error message when the inputs are empty', () => {
    cy.get('.MuiButton-root').click()
    cy.get('[data-testid="message-error-login"]').should(
      'contain',
      'El email es requerido',
    )
    cy.get('[data-testid="message-error-login"]').should(
      'contain',
      'El password es requerido',
    )
  })

  it('shows an error message when enter invalid email', () => {
    cy.get('#email').type('examplevivebamba.com')
    cy.get('.MuiButton-root').click()
    cy.get('[data-testid="message-error-login"]').should(
      'contain',
      'Ingrese un email válido',
    )
  })

  it('clean error message when enter invalid email', () => {
    cy.get('#email').type('examplevivebamba.com')
    cy.get('.MuiButton-root').click()
    cy.get('[data-testid="message-error-login"]').should(
      'contain',
      'Ingrese un email válido',
    )
    cy.get('#email').clear()
    cy.get('#email').type('example@vivebamba.com')
    cy.get('.MuiButton-root').click()
    cy.get('[data-testid="message-error-login"]').should(
      'not.have.value',
      'Ingrese un email válido',
    )
  })

  it('login success', () => {
    cy.get('#email').type('admin@vivebamba.com')
    cy.get('#password').type('Password')
    cy.get('.MuiButton-root').click()
    cy.get('[data-testid="drawer-item-Usuarios"]').should(
      'contain',
      'Usuarios',
    )
  })

  it('logout success', () => {
    cy.get('#email').type('admin@vivebamba.com')
    cy.get('#password').type('Password')
    cy.get('.MuiButton-root').click()
    cy.get('[data-testid="drawer-item-Usuarios"]').should(
      'contain',
      'Usuarios',
    )
    cy.get('[data-testid="navbar-logout"]').should('contain', 'Logout')
    cy.get('[data-testid="navbar-logout"]').first().click()
    cy.get('.MuiTypography-root').should('contain', 'PANEL')
  })

  it('should end session when recibe a status 401', () => {
    cy.get('#email').type('example@vivebamba.com')
    cy.get('#password').type('examplepassword')
    cy.get('.MuiButton-root').click()
    cy.get('#alert-dialog-title').should('contain', 'Error')
  })
})
