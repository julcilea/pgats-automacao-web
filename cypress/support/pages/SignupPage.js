class SignupPage {
    fillAccountDetails(user) {
        cy.get('input[type="radio"]').check('Mrs')
        cy.get('input[data-qa="password"]').type(user.password, { log: false })

        cy.get('select[data-qa="days"]').select('21')
        cy.get('select[data-qa="months"]').select('November')
        cy.get('select[data-qa="years"]').select('1979')

        cy.get('input[type=checkbox]#newsletter').check()
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
    }

    submitForm() {
        cy.get('button[data-qa="create-account"]').click()
    }

    getAccountCreatedTitle() {
        return cy.get('h2[data-qa="account-created"]')
    }
}

export default new SignupPage()
