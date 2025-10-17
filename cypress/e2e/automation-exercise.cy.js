/// <reference types="cypress" />

describe('Automation exercise', () => {
    const tryLogout = () => {
        // Verifica se existe o link de logout (usuário está logado)
        cy.get('body').then($body => {
            if ($body.find('a[href="/logout"]').length > 0) {
                cy.get('a[href="/logout"]').click()
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
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type(user.name)
        cy.get('input[data-qa="signup-email"]').type(user.email)
        cy.contains('button', 'Signup').click()

        cy.get('input[type="radio"]').check('Mrs')
        cy.get('input[data-qa="password"]').type(user.password, { log: false })

        cy.get('select[data-qa="days"]').select('21')
        cy.get('select[data-qa="months"]').select('November')
        cy.get('select[data-qa="years"]').select('1979')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('QA')
        cy.get('input#last_name').type('Tester')
        cy.get('input#company').type('Teste Company')
        cy.get('input#address1').type('Rua Teste, 123')
        cy.get('input#address2').type('Bairro Teste')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('State Teste')
        cy.get('input#city').type('City Teste')
        cy.get('input#zipcode').type('12345')
        cy.get('input#mobile_number').type('+5511999999999')

        cy.get('button[data-qa="create-account"]').click()
        cy.url().should('include', 'account_created')
    }

    it('Cadastrar um usuário', () => {
        cy.viewport(300, 720)
        const user = generateTestUser()
        createAccount(user)
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    })

    it('Logar com um usuário existente', () => {
        const user = generateTestUser()
        createAccount(user)

        cy.visit('https://automationexercise.com/')
        tryLogout()
        cy.get('a[href="/login"]').click()

        // Login com usuário válido
        cy.get('input[data-qa="login-email"]').type(user.email)
        cy.get('input[data-qa="login-password"]').type(user.password, { log: false })
        cy.get('button[data-qa="login-button"]').click()

        // Verificar se o login foi bem sucedido
        cy.get('a[href="/logout"]').should('be.visible')
        cy.get('i.fa.fa-user').parent().should('contain', 'Logged in as')
    })

    it('Logar com um usuário inexistente', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()

        // Tentar login com usuário inválido
        cy.get('input[data-qa="login-email"]').type('usuario-inexistente@test.com')
        cy.get('input[data-qa="login-password"]').type('senhaerrada123', { log: false })
        cy.get('button[data-qa="login-button"]').click()

        // Verificar mensagem de erro
        cy.get('p[style="color: red;"]').should('have.text', 'Your email or password is incorrect!')
    })

    it('Fazer logout do usuário logado', () => {
        const user = generateTestUser()
        createAccount(user)

        // Primeiro fazer login
        cy.visit('https://automationexercise.com/')
        tryLogout()
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="login-email"]').type(user.email)
        cy.get('input[data-qa="login-password"]').type(user.password, { log: false })
        cy.get('button[data-qa="login-button"]').click()

        // Verificar se está logado
        cy.get('i.fa.fa-user').parent().should('contain', 'Logged in as')

        // Fazer logout
        cy.get('a[href="/logout"]').click()

        // Verificar se voltou para a página de login
        cy.url().should('include', '/login')
        cy.get('div.login-form h2').should('have.text', 'Login to your account')
    })

    it('Cadastrar um usuário com email já cadastrado', () => {
        const user = generateTestUser()
        createAccount(user)

        cy.visit('https://automationexercise.com/')
        tryLogout()
        cy.get('a[href="/login"]').click()

        // Tentar cadastrar com email já existente
        cy.get('input[data-qa="signup-name"]').type('QA Duplicado')
        cy.get('input[data-qa="signup-email"]').type(user.email)
        cy.contains('button', 'Signup').click()

        // Verificar mensagem de erro
        cy.get('p[style="color: red;"]').should('have.text', 'Email Address already exist!')
    })

})