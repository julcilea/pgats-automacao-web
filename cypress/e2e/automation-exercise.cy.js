/// <reference types="cypress" />

describe('Automation exercise', () => {
    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        cy.viewport(300, 720)
        //cy.viewport('iphone-xr')

        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type('QA Tester')
        cy.get('input[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
        //cy.get('button[data-qa="signup-button"]').click()
        cy.contains('button', 'Signup').click()

        cy.get('input[type="radio"]').check('Mrs')
        //cy.get('input[id="id_gender2"]').check()
        cy.get('input[data-qa="password"]').type('teste123', { log: false }) //oculta a senha no log do cypress
        //cy.get('input#password').type('teste123')

        cy.get('select[data-qa="days"]').select('21')
        //cy.get('select#days').select('21')
        cy.get('select[data-qa="months"]').select('November')
        //cy.get('data-qa=months]').select('November')
        cy.get('select[data-qa="years"]').select('1979')

        cy.get('input[type=checkbox]#newsletter').check()
        //cy.get('input[type=newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('QA')
        cy.get('input#last_name').type('Tester')
        cy.get('input#company').type('Teste Company')
        cy.get('input#address1').type('Rua Teste, 123')
        cy.get('input#address2').type('Bairro Teste')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('State Teste')
        cy.get('input#city').type('City Teste')
        cy.get('input#zipcode').type('12345')
        cy.get('input#mobile_number').type('+5511999999999')

        cy.get('button[data-qa="create-account"]').click()

        cy.url().should('include', 'account_created')
        //cy.contains('Account Created!').should('be.visible')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    })

    it('', () => {
    })

})