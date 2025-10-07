class ContactPage {
    elements = {
        contactLink: () => cy.get('a[href="/contact_us"]'),
        nameInput: () => cy.get('input[data-qa="name"]'),
        emailInput: () => cy.get('input[data-qa="email"]'),
        subjectInput: () => cy.get('input[data-qa="subject"]'),
        messageInput: () => cy.get('textarea[data-qa="message"]'),
        uploadInput: () => cy.get('input[name="upload_file"]'),
        submitButton: () => cy.get('input[data-qa="submit-button"]'),
        successMessage: () => cy.get('.status.alert.alert-success')
    }

    visit() {
        cy.visit('https://automationexercise.com')
        return this
    }

    clickContact() {
        this.elements.contactLink().click()
        return this
    }

    fillContactForm(name, email, subject, message) {
        this.elements.nameInput().type(name)
        this.elements.emailInput().type(email)
        this.elements.subjectInput().type(subject)
        this.elements.messageInput().type(message)
        return this
    }

    uploadFile(filePath) {
        this.elements.uploadInput().selectFile(filePath)
        return this
    }

    submit() {
        this.elements.submitButton().click()
        cy.on('window:confirm', () => true) // Handle the alert
        return this
    }
}

export default new ContactPage()
