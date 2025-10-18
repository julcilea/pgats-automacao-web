class ModalPage {
    get button() {
        return cy.get('a.button.new');
    }

    get modal() {
        return cy.get('.modal'); // Adjust selector based on actual modal class
    }

    get amountField() {
        return cy.get('input[name="amount"]'); // Adjust selector based on actual field name
    }

    get descriptionField() {
        return cy.get('input[name="description"]'); // Adjust selector based on actual field name
    }

    get dateField() {
        return cy.get('input[name="date"]'); // Adjust selector based on actual field name
    }

    get closeButton() {
        return cy.get('.button.cancel'); // Adjust selector based on actual close button
    }

    openModal() {
        this.button.click();
    }

    closeModal() {
        this.closeButton.click();
    }
}

export const modalPage = new ModalPage();

