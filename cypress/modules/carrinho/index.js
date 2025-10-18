class CartPage {
    verifyProductInCart(productName) {
        cy.get('#cart_info').should('contain', productName)
    }

    proceedToCheckout() {
        cy.get('.btn.btn-default.check_out').click()
    }

    verifyAddressDetails() {
        return {
            delivery: () => cy.get('#address_delivery'),
            billing: () => cy.get('#address_invoice')
        }
    }

    verifyOrderDetails() {
        return cy.get('#cart_info')
    }

    addComment(comment) {
        cy.get('textarea.form-control').type(comment)
    }

    placeOrder() {
        cy.get('a.check_out').click()
    }

    confirmOrder() {
        cy.get('input[name="name_on_card"]').type('Test User')
        cy.get('input[name="card_number"]').type('4242424242424242')
        cy.get('input[name="cvc"]').type('123')
        cy.get('input[name="expiry_month"]').type('12')
        cy.get('input[name="expiry_year"]').type('2025')
        cy.get('#submit').click()
        // Wait for payment processing
        cy.wait(3000)
    }

    verifySuccessMessage() {
        // Wait for payment processing and page load
        cy.wait(2000)

        // Verify by checking multiple possible elements that could contain the success message
        return cy.get('body').then($body => {
            // Log the page content for debugging
            cy.log('Current page content for debugging:')
            cy.log($body.text())

            // Check for any of these success indicators
            return cy.get('div.container')
                .find('h2.title.text-center, div.alert-success, p.text-center')
                .should('be.visible')
                .and('contain', 'Order Placed');
        })
    }
}

export default new CartPage()
