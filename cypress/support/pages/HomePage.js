class HomePage {
    elements = {
        logoutLink: () => cy.get('a[href="/logout"]'),
        userInfo: () => cy.get('i.fa.fa-user').parent()
    }

    isLoggedIn() {
        this.elements.logoutLink().should('be.visible')
        this.elements.userInfo().should('contain', 'Logged in as')
        return this
    }

    logout() {
        this.elements.logoutLink().click()
        return this
    }

    tryLogout() {
        cy.get('body').then($body => {
            if ($body.find('a[href="/logout"]').length > 0) {
                this.logout()
                cy.url().should('include', '/login')
            }
        })
        return this
    }
}

export default new HomePage()
