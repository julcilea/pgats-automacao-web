/// <reference types="cypress" />

import LoginPage from '../support/pages/LoginPage'
import SignupPage from '../support/pages/SignupPage'
import HomePage from '../support/pages/HomePage'
import { getRandomEmail } from '../support/helpers'

describe('Automation exercise', () => {

    const generateTestUser = () => {
        return {
            name: 'QA Tester',
            email: getRandomEmail(),
            password: 'teste123'
        }
    }

    const createAccount = (user) => {
        LoginPage.signup(user.name, user.email)

        SignupPage.fillAccountDetails(user)
        SignupPage.submitForm()

        cy.url().should('include', 'account_created')
    }

    beforeEach(() => {
        LoginPage.visit()
    })


    it('Cadastrar um usuário', () => {
        const user = generateTestUser()
        LoginPage.clickLogin()
        createAccount(user)
        SignupPage.getAccountCreatedTitle().should('have.text', 'Account Created!')
    })

    it('Logar com um usuário existente', () => {
        const user = generateTestUser()
        LoginPage.clickLogin()
        createAccount(user)

        LoginPage.clickLogin()
        LoginPage.login(user.email, user.password)

        HomePage.isLoggedIn()
    })

    it('Logar com um usuário inexistente', () => {
        LoginPage.clickLogin()
        LoginPage.login('usuario-inexistente@test.com', 'senhaerrada123')

        LoginPage.getErrorMessage()
            .should('have.text', 'Your email or password is incorrect!')
    })

    it('Fazer logout do usuário logado', () => {
        const user = generateTestUser()
        LoginPage.clickLogin()
        createAccount(user)
        LoginPage.clickLogin()
        LoginPage.login(user.email, user.password)

        HomePage.isLoggedIn()
        HomePage.logout()

        cy.url().should('include', '/login')
        LoginPage.getLoginFormTitle()
            .should('have.text', 'Login to your account')
    })

    it('Cadastrar um usuário com email já cadastrado', () => {
        const user = generateTestUser()
        LoginPage.clickLogin()
        createAccount(user)
        LoginPage.clickLogin()
        LoginPage.signup('QA Duplicado', user.email)

        LoginPage.getErrorMessage()
            .should('have.text', 'Email Address already exist!')
    })

})