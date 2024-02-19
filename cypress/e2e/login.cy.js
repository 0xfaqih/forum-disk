describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  })

    it('should display login page correctly', () => {
        cy.get('input[placeholder="Email"]').should('be.visible');
        cy.get('input[placeholder="Password"]').should('be.visible');
        cy.get('button').contains('Log In').should('be.visible');
    })

    it('should display alert when email is empty', () => {
        cy.get('button').contains('Log In').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('"email" is not allowed to be empty');
        })
    })

    it('should display alert when password is empty', () => {
        cy.get('input[placeholder="Email"]').type('emailTest');
        cy.get('button').contains('Log In').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('"password" is not allowed to be empty');
        })
    })

    it('should display alert when email and passwoed are wrong', () => {
        cy.get('input[placeholder="Email"]').type('emailTest');
        cy.get('input[placeholder="Password"]').type('passwordWrong');
        cy.get('button').contains('Log In').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Email or password is wrong');
        })
    })

    it('should display homepage when username and password are correct', () => {
        cy.get('input[placeholder="Email"]').type('emailaseli@gmail.com');
        cy.get('input[placeholder="Password"]').type('passwordkuat');
        cy.get('button').contains('Log In').click();
        cy.get('h2').contains('Disksusi tersedia').should('be.visible');
        cy.get('span').contains('Keluar').should('be.visible');
    })
})

