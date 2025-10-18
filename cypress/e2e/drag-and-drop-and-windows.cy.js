describe('Drag and Drop and Windows', () => {

    it('Multiple Windows - Deve abrir uma nova janela ao clicar no link', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.contains('Click Here').invoke('removeAttr', 'target').click()

        cy.url().should('include', '/windows/new')
        cy.get('h3').should('have.text', 'New Window')
    })

    it('Drag and Drop - Deve arrastar o elemento A para a posição do elemento B', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')

        const dataTransfer = new DataTransfer()

        cy.get('#column-a').as('columnA')
        cy.get('#column-b').as('columnB')

        cy.get('@columnA').trigger('dragstart', { dataTransfer })
        cy.get('@columnB').trigger('drop', { dataTransfer })
        cy.get('@columnA').trigger('dragend')

        // Verifica se as colunas foram trocadas
        cy.get('#column-a header').should('have.text', 'B')
        cy.get('#column-b header').should('have.text', 'A')
    })
})