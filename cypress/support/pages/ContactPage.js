class ContactPage {
    visit() {
        cy.visit('https://automationexercise.com')
    }

    clickContact() {
        cy.get('a[href="/contact_us"]', { timeout: 10000 }).click()
    }

    fillContactForm(name, email, subject, message) {
        // Aguardar formulário estar visível antes de preencher
        cy.get('input[data-qa="name"]').should('be.visible').type(name)
        cy.get('input[data-qa="email"]').should('be.visible').type(email)
        cy.get('input[data-qa="subject"]').should('be.visible').type(subject)
        cy.get('textarea[data-qa="message"]').should('be.visible').type(message)
    }

    uploadFile(filePath) {
        cy.get('input[name="upload_file"]').selectFile(filePath)
    }

    submit() {
        cy.get('input[data-qa="submit-button"]').click()
        cy.on('window:confirm', () => true) // Handle the alert
    }

    getSuccessMessage() {
        return cy.get('.status.alert.alert-success')
    }
}

export default new ContactPage()
