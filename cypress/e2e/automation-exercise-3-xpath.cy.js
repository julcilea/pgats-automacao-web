/// <reference types="cypress" />

describe('Automation exercise', () => {
    const tryLogout = () => {
        // Verifica se existe o link de logout (usuário está logado)
        cy.get('body').then($body => {
            if ($body.find('a[href="/logout"]').length > 0) {
                cy.xpath('//a[@href="/logout"]').click()
                cy.url().should('include', '/login')
            }
        })
    }

    afterEach(() => {
        // Tenta fazer logout após cada teste
        tryLogout()
    })

    const generateTestUser = () => {
        const timestamp = new Date().getTime()
        return {
            name: 'QA Tester',
            email: `qa-tester-${timestamp}@test.com`,
            password: 'teste123'
        }
    }

    const createAccount = (user) => {
        cy.visit('https://automationexercise.com/')
        cy.xpath('//a[@href="/login"]').click()
        cy.xpath('//input[@data-qa="signup-name"]').type(user.name)
        cy.xpath('//input[@data-qa="signup-email"]').type(user.email)
        cy.xpath('//button[text()="Signup"]').click()

        cy.xpath('//input[@type="radio"]').check('Mrs')
        cy.xpath('//input[@data-qa="password"]').type(user.password, { log: false })

        cy.xpath('//select[@data-qa="days"]').select('21')
        cy.xpath('//select[@data-qa="months"]').select('November')
        cy.xpath('//select[@data-qa="years"]').select('1979')

        cy.xpath('//input[@type="checkbox"][@id="newsletter"]').check()
        cy.xpath('//input[@type="checkbox"][@id="optin"]').check()

        cy.xpath('//input[@id="first_name"]').type('QA')
        cy.xpath('//input[@id="last_name"]').type('Tester')
        cy.xpath('//input[@id="company"]').type('Teste Company')
        cy.xpath('//input[@id="address1"]').type('Rua Teste, 123')
        cy.xpath('//input[@id="address2"]').type('Bairro Teste')
        cy.xpath('//select[@id="country"]').select('Canada')
        cy.xpath('//input[@id="state"]').type('State Teste')
        cy.xpath('//input[@id="city"]').type('City Teste')
        cy.xpath('//input[@id="zipcode"]').type('12345')
        cy.xpath('//input[@id="mobile_number"]').type('+5511999999999')

        cy.xpath('//button[@data-qa="create-account"]').click()
        cy.url().should('include', 'account_created')
    }

    it('Cadastrar um usuário', () => {
        cy.viewport(300, 720)
        const user = generateTestUser()
        createAccount(user)
        cy.xpath('//h2[@data-qa="account-created"]').should('have.text', 'Account Created!')
    })

    it('Logar com um usuário existente', () => {
        const user = generateTestUser()
        createAccount(user)

        cy.visit('https://automationexercise.com/')
        tryLogout()
        cy.xpath('//a[@href="/login"]').click()

        // Login com usuário válido
        cy.xpath('//input[@data-qa="login-email"]').type(user.email)
        cy.xpath('//input[@data-qa="login-password"]').type(user.password, { log: false })
        cy.xpath('//button[@data-qa="login-button"]').click()

        // Verificar se o login foi bem sucedido
        cy.xpath('//a[@href="/logout"]').should('be.visible')
        cy.xpath('//i[contains(@class, "fa-user")]/..').should('contain', 'Logged in as')
    })

    it('Logar com um usuário inexistente', () => {
        cy.visit('https://automationexercise.com/')
        cy.xpath('//a[@href="/login"]').click()

        // Tentar login com usuário inválido
        cy.xpath('//input[@data-qa="login-email"]').type('usuario-inexistente@test.com')
        cy.xpath('//input[@data-qa="login-password"]').type('senhaerrada123', { log: false })
        cy.xpath('//button[@data-qa="login-button"]').click()

        // Verificar mensagem de erro
        cy.xpath('//p[@style="color: red;"]').should('have.text', 'Your email or password is incorrect!')
    })

    it('Fazer logout do usuário logado', () => {
        const user = generateTestUser()
        createAccount(user)

        // Primeiro fazer login
        cy.visit('https://automationexercise.com/')
        tryLogout()
        cy.xpath('//a[@href="/login"]').click()
        cy.xpath('//input[@data-qa="login-email"]').type(user.email)
        cy.xpath('//input[@data-qa="login-password"]').type(user.password, { log: false })
        cy.xpath('//button[@data-qa="login-button"]').click()

        // Verificar se está logado
        cy.xpath('//i[contains(@class, "fa-user")]/..').should('contain', 'Logged in as')

        // Fazer logout
        cy.xpath('//a[@href="/logout"]').click()

        // Verificar se voltou para a página de login
        cy.url().should('include', '/login')
        cy.xpath('//div[contains(@class, "login-form")]//h2').should('have.text', 'Login to your account')
    })

    it('Cadastrar um usuário com email já cadastrado', () => {
        const user = generateTestUser()
        createAccount(user)

        cy.visit('https://automationexercise.com/')
        tryLogout()
        cy.xpath('//a[@href="/login"]').click()

        // Tentar cadastrar com email já existente
        cy.xpath('//input[@data-qa="signup-name"]').type('QA Duplicado')
        cy.xpath('//input[@data-qa="signup-email"]').type(user.email)
        cy.xpath('//button[text()="Signup"]').click()

        // Verificar mensagem de erro
        cy.xpath('//p[@style="color: red;"]').should('have.text', 'Email Address already exist!')
    })

})