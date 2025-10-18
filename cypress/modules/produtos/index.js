class ProductsPage {
    visitProducts() {
        cy.get('a[href="/products"]').click()
        cy.url().should('include', '/products')
    }

    getProductList() {
        return cy.get('.features_items .col-sm-4')
    }

    clickViewProduct(index) {
        cy.get('.features_items .col-sm-4').eq(index).find('a[href^="/product_details/"]').click()
    }

    getProductDetails() {
        return {
            name: () => cy.get('.product-information h2'),
            category: () => cy.get('.product-information p').first(),
            price: () => cy.get('.product-information span span').first(),
            availability: () => cy.get('.product-information p').eq(1),
            condition: () => cy.get('.product-information p').eq(2),
            brand: () => cy.get('.product-information p').eq(3)
        }
    }

    searchProduct(productName) {
        cy.get('#search_product').type(productName)
        cy.get('#submit_search').click()
    }

    getSearchResults() {
        return cy.get('.features_items .col-sm-4')
    }

    addToCart(index) {
        cy.get('.features_items .col-sm-4').eq(index).find('.add-to-cart').first().click()
    }

    continueShoppingAfterAdd() {
        cy.get('.modal-footer button').click()
    }

    viewCart() {
        // Adiciona force: true para garantir o clique mesmo se houver modal
        cy.get('a[href="/view_cart"]').first().click({ force: true })
    }
}

export default new ProductsPage()
