/// <reference types="cypress" />

import ContactPage from '../support/pages/ContactPage'

describe('Contact Form Tests', () => {
    beforeEach(() => {
        // Reset application state before each test
        cy.visit('https://automationexercise.com')
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
            .visit()
            .clickContact()
            .fillContactForm(
                contactData.name,
                contactData.email,
                contactData.subject,
                contactData.message
            )
            .uploadFile('cypress/fixtures/test-file.txt')
            .submit()

        // Verify success message
        ContactPage.elements.successMessage()
            .should('be.visible')
            .and('contain', 'Success! Your details have been submitted successfully.')
    })
})
