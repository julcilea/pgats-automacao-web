/// <reference types="cypress" />

import LoginPage from '../modules/login'
import cadastro from '../modules/cadastro'
import menu from '../modules/menu'
import ProductsPage from '../modules/produtos'
import CartPage from '../modules/carrinho'
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
        // Verificar se há alguém logado e fazer logout se necessário
        cy.get('body').then($body => {
            if ($body.find('a[href="/logout"]').length > 0) {
                cy.get('a[href="/logout"]').click()
            }
        })
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

    it('Verificar todos os produtos e a página de detalhes do produto', () => {
        ProductsPage.visitProducts()
        ProductsPage.getProductList().should('have.length.gt', 0)

        // Click on view product of first product
        ProductsPage.clickViewProduct(0)

        // Verify product detail is opened
        cy.url().should('include', '/product_details/')
        const details = ProductsPage.getProductDetails()
        details.name().should('be.visible')
        details.category().should('be.visible')
        details.price().should('be.visible')
        details.availability().should('be.visible')
        details.condition().should('be.visible')
        details.brand().should('be.visible')
    })

    it('Pesquisar produto', () => {
        ProductsPage.visitProducts()
        const searchTerm = 'dress'  // Changed to a product that exists on the site

        ProductsPage.searchProduct(searchTerm)
        ProductsPage.getSearchResults().should('have.length.gt', 0)
        // Check if the product name contains the search term (case insensitive)
        ProductsPage.getSearchResults().first().find('.productinfo p').invoke('text').then((text) => {
            expect(text.toLowerCase()).to.include(searchTerm.toLowerCase())
        })
    })

    it('Verificar assinatura na página inicial', () => {
        LoginPage.visit()
        const testEmail = getFakeEmail()

        cy.get('footer').scrollIntoView()
        cy.get('#susbscribe_email').type(testEmail)
        cy.get('#subscribe').click()
        cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
    })

    it('Fazer pedido: Cadastrar-se antes de finalizar a compra', () => {
        const user = generateTestUser()

        // Add products to cart
        ProductsPage.visitProducts()
        ProductsPage.addToCart(0)
        ProductsPage.continueShoppingAfterAdd()
        ProductsPage.addToCart(1)
        ProductsPage.viewCart()

        // Proceed to checkout
        CartPage.proceedToCheckout()

        // Register / Login link should be displayed
        cy.get('.modal-content').should('be.visible')

        // Create account
        LoginPage.clickLogin()
        createAccount(user)

        // Add products to cart again (since we navigated away)
        ProductsPage.visitProducts()
        ProductsPage.addToCart(0)
        ProductsPage.continueShoppingAfterAdd()
        ProductsPage.addToCart(1)
        ProductsPage.viewCart()

        // Proceed to checkout
        CartPage.proceedToCheckout()

        // Verify address details
        const addressDetails = CartPage.verifyAddressDetails()
        addressDetails.delivery().should('be.visible')
        addressDetails.billing().should('be.visible')

        // Add comment and place order
        CartPage.addComment('Test order')
        CartPage.placeOrder()

        // Enter payment details and confirm order
        CartPage.confirmOrder()

        // Verify success message with more specific selector
        cy.get('div.container', { timeout: 10000 })
            .find('h2.title.text-center')
            .should('be.visible')
            .and('contain', 'Order Placed!')
    })

    it('Fazer pedido: Fazer login antes de finalizar a compra', () => {
        const user = generateTestUser()

        // Create account first
        LoginPage.clickLogin()
        createAccount(user)

        // Login
        LoginPage.clickLogin()
        LoginPage.login(user.email, user.password)

        // Add products to cart
        ProductsPage.visitProducts()
        ProductsPage.addToCart(0)
        ProductsPage.continueShoppingAfterAdd()
        ProductsPage.addToCart(1)
        ProductsPage.viewCart()

        // Proceed to checkout
        CartPage.proceedToCheckout()

        // Verify address details
        const addressDetails = CartPage.verifyAddressDetails()
        addressDetails.delivery().should('be.visible')
        addressDetails.billing().should('be.visible')

        // Add comment and place order
        CartPage.addComment('Test order with existing account')
        CartPage.placeOrder()

        // Enter payment details and confirm order
        CartPage.confirmOrder()

        // Verify success message with more specific selector
        cy.get('div.container', { timeout: 10000 })
            .find('h2.title.text-center')
            .should('be.visible')
            .and('contain', 'Order Placed!')
    })

})