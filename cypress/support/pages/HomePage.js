class HomePage {

    isLoggedIn() {
        cy.get('a[href="/logout"]').should('be.visible')
        cy.get('i.fa.fa-user').parent().should('contain', 'Logged in as')
        cy.log('✅ Usuário deslogado');
    }

    logout() {
        cy.get('a[href="/logout"]').click();
        cy.log('🔴 Logout realizado com sucesso.');
    }

    tryLogout() {
        cy.get('body').then($body => {
            console.log($body.html());

            if ($body.find('a[href="/logout"]', { timeout: 10000 }).length > 0) {
                cy.log('🔴 Usuário está logado, realizando logout...');
                logout();
            } else {
                cy.log('✅ Usuário já está deslogado, nada a fazer.');
            }
        });
    }
}

export default new HomePage()
