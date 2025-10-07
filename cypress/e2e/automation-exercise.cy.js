/// <reference types="cypress" />

import LoginPage from '../support/pages/LoginPage'
import SignupPage from '../support/pages/SignupPage'
import HomePage from '../support/pages/HomePage'

describe('Automation exercise', () => {
    const generateTestUser = () => {
        const timestamp = new Date().getTime()
        return {
            name: 'QA Tester',
            email: `qa-tester-${timestamp}@test.com`,
            password: 'teste123'
        }
    }

    const createAccount = (user) => {
        LoginPage
            .visit()
            .clickLogin()
            .signup(user.name, user.email)

        SignupPage
            .fillAccountDetails(user)
            .submitForm()

        cy.url().should('include', 'account_created')
    }

    afterEach(() => {
        HomePage.tryLogout()
    })

    it('Cadastrar um usuário', () => {
        cy.viewport(300, 720)
        const user = generateTestUser()
        createAccount(user)
        SignupPage.elements.accountCreatedTitle().should('have.text', 'Account Created!')
    })

    it('Logar com um usuário existente', () => {
        const user = generateTestUser()
        createAccount(user)

        LoginPage
            .visit()
            .clickLogin()
            .login(user.email, user.password)

        HomePage.isLoggedIn()
    })

    it('Logar com um usuário inexistente', () => {
        LoginPage
            .visit()
            .clickLogin()
            .login('usuario-inexistente@test.com', 'senhaerrada123')

        LoginPage.elements.errorMessage()
            .should('have.text', 'Your email or password is incorrect!')
    })

    it('Fazer logout do usuário logado', () => {
        const user = generateTestUser()
        createAccount(user)

        LoginPage
            .visit()
            .clickLogin()
            .login(user.email, user.password)

        HomePage
            .isLoggedIn()
            .logout()

        cy.url().should('include', '/login')
        LoginPage.elements.loginFormTitle()
            .should('have.text', 'Login to your account')
    })

    it('Cadastrar um usuário com email já cadastrado', () => {
        const user = generateTestUser()
        createAccount(user)

        LoginPage
            .visit()
            .clickLogin()
            .signup('QA Duplicado', user.email)

        LoginPage.elements.errorMessage()
            .should('have.text', 'Email Address already exist!')
    })

})