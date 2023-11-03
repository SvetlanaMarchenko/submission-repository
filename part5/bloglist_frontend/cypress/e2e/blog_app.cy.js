describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'salainen'
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  describe('Login', () => {
    beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    it('succeeds with correct credentials', () => {
      cy.contains('log in').click();
      cy.get('#username').type('hellas');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Arto Hellas logged in');
    });

    it('fails with wrong credentials', () => {
      cy.contains('log in').click();
      cy.get('#username').type('hellas');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.error').should('contain', 'wrong credentials');
    });
  })
  });

});
