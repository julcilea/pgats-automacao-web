/// <reference types="cypress" />

import login from '../modules/login'
import cadastro from '../modules/cadastro'
import menu from '../modules/menu'
import produto from '../modules/produto'
import contato from '../modules/contato'
import carrinho from '../modules/carrinho'
import inscricao from '../modules/inscricao'
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
        login.signup(user.name, user.email)
        cadastro.fillAccountDetails(user)
        cadastro.submitForm()
        cy.url().should('include', 'account_created')
    }

    beforeEach(() => {
        login.visit()
        menu.tryLogout()
    })

    it('CT01 - Cadastrar um usuário', () => {
        const user = generateTestUser()
        login.clickLogin()
        createAccount(user)
        cadastro.getAccountCreatedTitle().should('have.text', 'Account Created!')
    })

    it('CT02 - Logar com um usuário existente', () => {
        const user = generateTestUser()
        login.clickLogin()
        createAccount(user)

        login.clickLogin()
        login.login(user.email, user.password)

        menu.isLoggedIn()
    })

    it('CT03 - Logar com um usuário inexistente', () => {
        login.clickLogin()
        login.login('usuario-inexistente@test.com', 'senhaerrada123')

        login.getErrorMessage()
            .should('have.text', 'Your email or password is incorrect!')
    })

    it('CT04 - Fazer logout do usuário logado', () => {
        const user = generateTestUser()
        login.clickLogin()
        createAccount(user)
        login.clickLogin()
        login.login(user.email, user.password)

        menu.isLoggedIn()
        menu.logout()

        cy.url().should('include', '/login')
        login.getLoginFormTitle()
            .should('have.text', 'Login to your account')
    })

    it('CT05 - Cadastrar um usuário com email já cadastrado', () => {
        const user = generateTestUser()
        login.clickLogin()
        createAccount(user)
        login.clickLogin()
        login.signup('QA Duplicado', user.email)

        login.getErrorMessage()
            .should('have.text', 'Email Address already exist!')
    })

    it('CT06 - formulário de contato', () => {
        // Navegar até a página de contato
        contato.visit()
        contato.clickContact()

        // Preparar dados do formulário
        const name = getFakeName()
        const email = getFakeEmail()
        const subject = 'Teste de contato - CT06'
        const message = 'Mensagem enviada pelo teste automatizado (CT06).'

        // Preencher formulário, anexar arquivo e submeter
        contato.fillContactForm(name, email, subject, message)
        contato.uploadFile('cypress/fixtures/test-file.txt')
        contato.submit()

        // Verificar mensagem de sucesso
        contato.getSuccessMessage().should('be.visible').and('contain', 'Success')
    })

    it('CT08 - Verificar todos os produtos e a página de detalhes do produto', () => {
        produto.visitProducts()
        produto.getProductList().should('have.length.gt', 0)

        // Click on view product of first product
        produto.clickViewProduct(0)

        // Verify product detail is opened
        cy.url().should('include', '/product_details/')
        const details = produto.getProductDetails()
        details.name().should('be.visible')
        details.category().should('be.visible')
        details.price().should('be.visible')
        details.availability().should('be.visible')
        details.condition().should('be.visible')
        details.brand().should('be.visible')
    })

    it('CT09 - Pesquisar produto', () => {
        produto.visitProducts()
        const searchTerm = 'dress'  // Changed to a product that exists on the site

        produto.searchProduct(searchTerm)
        produto.getSearchResults().should('have.length.gt', 0)
        // Check if the product name contains the search term (case insensitive)
        produto.getSearchResults().first().find('.productinfo p').invoke('text').then((text) => {
            expect(text.toLowerCase()).to.include(searchTerm.toLowerCase())
        })
    })

    it('CT10 - Verificar assinatura na página inicial', () => {
        login.visit()
        const testEmail = getFakeEmail()

        inscricao.subscribe(testEmail)
        inscricao.getSuccessMessage().should('contain', 'You have been successfully subscribed!')
    })

    it('CT15 - Fazer pedido: Cadastrar-se antes de finalizar a compra', () => {
        const user = generateTestUser()

        // Add products to cart
        produto.visitProducts()
        produto.addToCart(0)
        produto.continueShoppingAfterAdd()
        produto.addToCart(1)
        produto.viewCart()

        // Proceed to checkout
        carrinho.proceedToCheckout()

        // Create account
        login.clickLogin()
        createAccount(user)

        // Add products to cart again (since we navigated away)
        produto.visitProducts()
        produto.addToCart(0)
        produto.continueShoppingAfterAdd()
        produto.addToCart(1)
        produto.viewCart()

        // Proceed to checkout
        carrinho.proceedToCheckout()

        // Verify address details
        const addressDetails = carrinho.verifyAddressDetails()
        addressDetails.delivery().should('be.visible')
        addressDetails.billing().should('be.visible')

        // Add comment and place order
        carrinho.addComment('Test order')
        carrinho.placeOrder()

        // Enter payment details and confirm order
        carrinho.confirmOrder()

        // Verify success message
        carrinho.verifySuccessMessage()
    })

})