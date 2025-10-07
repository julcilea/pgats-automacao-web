describe('Cadastrar entradas e saídas com bugs', () => {
    beforeEach(() => {
        cy.visit("https://devfinance-agilizei.netlify.app")
    })

    it('Cadastrar uma nova transação de entrada - falha 1', () => {
        cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
        cy.xpath("//input[@id='description']").type("Mesada")
        cy.xpath("//input[@id='amount']").type(100)
        cy.xpath("//input[@id='date']").type("2023-02-01")

        cy.xpath("//button[text()='Salvar']").click()

        cy.xpath("//tbody/tr").should("have.length", 1)
    });

    it('Cadastrar uma nova transação de entrada - falha 2', () => {
        cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
        cy.xpath("//input[@id='description']").type("Mesada")
        cy.xpath("//input[@id='amount']").type(100)
        cy.xpath("//input[@id='date']").type("2023-02-01")

        cy.xpath("//button[text()='Salvar']").click()

        cy.xpath("//tbody/tr").should("have.length", 1)
    });

    it('Cadastrar uma nova transação de entrada - falha 3', () => {
        cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
        cy.xpath("//input[@id='description']").type("Mesada")
        cy.xpath("//input[@id='amount']").type(100)
        cy.xpath("//input[@id='date']").type("2023-02-01")

        cy.xpath("//button[text()='Salvar']").click()

        cy.xpath("//tbody/tr").should("have.length", 1)
    });

    it('Cadastrar uma nova transação de entrada - falha 4', () => {
        cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
        cy.xpath("//input[@id='description']").type("Mesada")
        cy.xpath("//input[@id='amount']").type(100)
        cy.xpath("//input[@id='date']").type("2023-02-01")

        cy.xpath("//button[text()='Salvar']").click()

        cy.xpath("//tbody/tr").should("have.length", 1)
    });

    it('Cadastrar uma nova transação de entrada - falha 5', () => {
        cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
        cy.xpath("//input[@id='description']").type("Mesada")
        cy.xpath("//input[@id='amount']").type(100)
        cy.xpath("//input[@id='date']").type("2023-02-01")

        cy.xpath("//button[text()='Salvar']").click()

        cy.xpath("//tbody/tr").should("have.length", 1)
    });

    it('Cadastrar uma nova transação de entrada - falha 6', () => {
        cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
        cy.xpath("//input[@id='description']").type("Mesada")
        cy.xpath("//input[@id='amount']").type(100)
        cy.xpath("//input[@id='date']").type("2023-02-01")

        cy.xpath("//button[text()='Salvar']").click()

        cy.xpath("//tbody/tr").should("have.length", 1)
    });
}); 