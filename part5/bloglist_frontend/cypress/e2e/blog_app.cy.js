describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })



  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('hellas')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click() // Выбираем кнопку с id "login-button" и кликаем по ней
    })
  })
  
  
    // it('fails with wrong credentials', function() {
    //   cy.get('input:first').type('hellas')
    //   cy.get('input:last').type('wrong')
    //   // cy.get('#login-button').click()
    //   cy.contains('log in').click()
    // })
  })
 
  
  
  
    // describe('when logged in', function() {
    //   beforeEach(function() {
    //     cy.login({ username: 'hellas', password: 'salainen' })
    //   })
  