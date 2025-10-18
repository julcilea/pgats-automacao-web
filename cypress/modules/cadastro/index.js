import { faker } from '@faker-js/faker';

class SignupPage {
    fillAccountDetails(user) {
        // Wait for the form to be visible
        cy.get('form[action="/signup"]', { timeout: 10000 }).should('be.visible')
        cy.get('input[type="radio"][value="Mrs"]', { timeout: 10000 }).check()
        cy.get('input[data-qa="password"]').type(user.password, { log: false })

        cy.get('select[data-qa="days"]').select(faker.number.int({ min: 1, max: 28 }).toString())
        cy.get('select[data-qa="months"]').select(faker.date.month())
        cy.get('select[data-qa="years"]').select(faker.number.int({ min: 1950, max: 2000 }).toString())

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('input#address2').type(faker.location.secondaryAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('input#zipcode').type(faker.location.zipCode('#####'))
        cy.get('input#mobile_number').type(faker.phone.number('+55###########'))
    }

    submitForm() {
        cy.get('button[data-qa="create-account"]').click()
    }

    getAccountCreatedTitle() {
        return cy.get('h2[data-qa="account-created"]')
    }
}

export default new SignupPage()
