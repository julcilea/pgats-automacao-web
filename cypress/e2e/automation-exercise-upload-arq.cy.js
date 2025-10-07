/// <reference types="cypress" />

import ContactPage from '../support/pages/ContactPage'
import LoginPage from '../support/pages/LoginPage'
import { getRandomEmail } from '../support/helpers'

describe('Contact Form Tests', () => {
    const user = {
        email: getRandomEmail(),
        password: 'teste123',
        name: 'QA Tester'
    }

    beforeEach(() => {
        // Login before each test
        LoginPage
            .visit()
            .clickLogin()
            .login(user.email, user.password)
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

        ContactPage
            .clickContact()
            .fillContactForm(
                user.name,
                user.email,
                contactData.subject,
                contactData.message
            )
            .uploadFile('cypress/fixtures/test-file.txt')
            .submit()

        // Verify success message
        ContactPage.getSuccessMessage()
            .should('be.visible')
            .and('contain', 'Success! Your details have been submitted successfully.')
    })
})
