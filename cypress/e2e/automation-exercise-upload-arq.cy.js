/// <reference types="cypress" />

import ContactPage from '../modules/contato'
import LoginPage from '../modules/login'
import { getFakeEmail } from '../support/helpers'

describe('Contact Form Tests', () => {
    const user = {
        email: getFakeEmail(),
        password: 'teste123',
        name: 'QA Tester'
    }

    beforeEach(() => {
        LoginPage.visit()
        LoginPage.clickLogin()
        LoginPage.login(user.email, user.password)
    })

    it('Should submit contact form with file upload', () => {
        // Test data
        const contactData = {
            name: 'QA Tester',
            email: 'qa@test.com',
            subject: 'Test Contact Form',
            message: 'This is a test message for the contact form'
        }

        // Create a test file to upload
        cy.writeFile('cypress/fixtures/test-file.txt', 'This is a test file for upload')

        // Navigate to contact page
        ContactPage.clickContact()

        // Fill and submit form
        ContactPage.fillContactForm(
            user.name,
            user.email,
            contactData.subject,
            contactData.message
        )
        ContactPage.uploadFile('cypress/fixtures/test-file.txt')
        ContactPage.submitForm()

        // Verify success message
        cy.get('.alert-success')
            .should('be.visible')
            .and('contain', 'Success! Your details have been submitted successfully.')
    })
})
