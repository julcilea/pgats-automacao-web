class LoginPage {
    // Elementos da página
    elements = {
        loginLink: () => cy.get('a[href="/login"]'),
        emailInput: () => cy.get('input[data-qa="login-email"]'),
        passwordInput: () => cy.get('input[data-qa="login-password"]'),
        loginButton: () => cy.get('button[data-qa="login-button"]'),
        signupNameInput: () => cy.get('input[data-qa="signup-name"]'),
        signupEmailInput: () => cy.get('input[data-qa="signup-email"]'),
        signupButton: () => cy.contains('button', 'Signup'),
        errorMessage: () => cy.get('p[style="color: red;"]'),
        loginFormTitle: () => cy.get('div.login-form h2')
    }

    // Ações da página
    visit() {
        cy.visit('https://automationexercise.com/')
        return this
    }

    clickLogin() {
        this.elements.loginLink().click()
        return this
    }

    login(email, password) {
        this.elements.emailInput().type(email)
        this.elements.passwordInput().type(password, { log: false })
        this.elements.loginButton().click()
        return this
    }

    signup(name, email) {
        this.elements.signupNameInput().type(name)
        this.elements.signupEmailInput().type(email)
        this.elements.signupButton().click()
        return this
    }
}

export default new LoginPage()
