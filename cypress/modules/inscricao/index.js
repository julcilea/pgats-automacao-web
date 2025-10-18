class NewsletterPage {
    subscribe(email) {
        cy.get('footer').scrollIntoView()
        cy.get('#susbscribe_email').type(email)
        cy.get('#subscribe').click()
    }

    getSuccessMessage() {
        return cy.get('.alert-success')
    }
}

export default new NewsletterPage()