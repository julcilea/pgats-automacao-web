class LoginPage {
    // Ações da página
    visit() {
        cy.visit('https://automationexercise.com/', { timeout: 30000 })
        cy.viewport(300, 720)
    }

    clickLogin() {
        cy.get('body').then($body => {
            console.log($body.html());
            if ($body.find('a[href="/login"]', { timeout: 10000 }).length > 0) {
                cy.log('✅ Usuário não está logado')
                cy.get('a[href="/login"]').click()
            }
        });

        cy.get('body').then($body => {
            if ($body.find('a[href="/logout"]', { timeout: 10000 }).length > 0) {
                cy.log('🔴 Usuário está logado');
                cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible').click()
                cy.get('a[href="/login"]', { timeout: 10000 }).should('be.visible').click()
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
