class LoginPage {
    // Ações da página
    visit() {
        cy.visit('https://automationexercise.com/', { timeout: 30000 })
        cy.viewport(1280, 720)
    }

    clickLogin() {
        // Close any open modals first
        cy.get('body').then($body => {
            if ($body.find('#checkoutModal').length > 0) {
                // Wait for modal animation to complete
                cy.wait(1000);
                cy.get('#checkoutModal a[href="/login"]').click({ force: true });
            } else {
                cy.get('a[href="/login"]').first().click({ force: true });
            }
        });

        cy.get('body').then($body => {
            if ($body.find('a[href="/login"]').length > 0) {
                cy.log('✅ Usuário não está logado')
                cy.get('a[href="/login"]').first().click({ force: true })
            }
        });

        cy.get('body').then($body => {
            if ($body.find('a[href="/logout"]').length > 0) {
                cy.log('🔴 Usuário está logado');
                cy.get('a[href="/logout"]').first().should('be.visible').click()
                cy.get('a[href="/login"]').first().should('be.visible').click()
            }
        });
    }

    login(email, password) {
        cy.get('input[data-qa="login-email"]').type(email)
        cy.get('input[data-qa="login-password"]').type(password, { log: false })
        cy.get('button[data-qa="login-button"]').click()
    }

    signup(name, email) {
        cy.get('input[data-qa="signup-name"]').type(name)
        cy.get('input[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    getErrorMessage() {
        return cy.get('p[style="color: red;"]')
    }

    getLoginFormTitle() {
        return cy.get('div.login-form h2')
    }
}

export default new LoginPage()
