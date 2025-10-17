/// <reference types="cypress" />

import LoginPage from '../modules/login'
import cadastro from '../modules/cadastro'
import menu from '../modules/menu'
import { getFakeName, getFakeEmail, getFakePassword } from '../support/helpers'

describe('Automation exercise', () => {

    const generateTestUser = () => {
        return {
            name: getFakeName(),
            email: getFakeEmail(),
            password: getFakePassword()
        }
    }

    const createAccount = (user) => {
        LoginPage.signup(user.name, user.email)
        cadastro.fillAccountDetails(user)
        cadastro.submitForm()
        cy.url().should('include', 'account_created')
    }

    beforeEach(() => {
        LoginPage.visit()
    })

    it('Cadastrar um usuário', () => {
        const user = generateTestUser()
        LoginPage.clickLogin()
        createAccount(user)
        cadastro.getAccountCreatedTitle().should('have.text', 'Account Created!')
    })

    it('Logar com um usuário existente', () => {
        const user = generateTestUser()
        LoginPage.clickLogin()
        createAccount(user)

        LoginPage.clickLogin()
        LoginPage.login(user.email, user.password)

        menu.isLoggedIn()
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

        menu.isLoggedIn()
        menu.logout()

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