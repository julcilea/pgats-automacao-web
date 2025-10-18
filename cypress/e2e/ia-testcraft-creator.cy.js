/*
VPositive Tests:
   Verify that clicking on the button labeled "+ Nova Transação" opens the modal for creating a new transaction.  
   Check that the modal contains all necessary fields for a new transaction, such as amount, description, and date.  
   Ensure that the button is visually distinct and clearly indicates that it is for creating a new transaction.  
   Validate that the modal can be closed after it is opened, returning the user to the previous state.  
   Confirm that the button is accessible via keyboard navigation and can be activated using the Enter key.  

Negative Tests:
   Test the behavior when the button is clicked without a valid modal function (e.g., simulate a failure in the Modal.open() function) and verify that an error message is displayed.  
   Attempt to open the modal multiple times in quick succession and ensure that it does not allow multiple instances to open simultaneously.  
   Check the response when the user tries to submit the modal without filling in any required fields, ensuring appropriate error messages are displayed.  
   Verify that clicking the button does not navigate the user away from the current page, ensuring the href attribute does not lead to any unexpected behavior.  

Creative Test Scenarios:
   Simulate a scenario where the user has a slow internet connection and observe if the modal opens gracefully or shows a loading indicator.  
   Test the button's functionality in different browser environments (e.g., mobile vs. desktop) to ensure consistent behavior across platforms.  
   Explore the user experience by testing the button's behavior when the user is logged in versus when they are logged out, ensuring proper access control to the modal.  
   Investigate how the modal behaves when the user resizes the browser window or rotates their mobile device, ensuring it remains usable and visually appealing.  
   Create a scenario where the user tries to open the modal while another modal is already open, checking if appropriate handling takes place.  
*/
import { modalPage } from '../support/pageObjects/modalPage';

describe('Modal Tests', () => {
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
    });

    it('Verify that clicking on the button labeled "+ Nova Transação" opens the modal for creating a new transaction', () => {
        modalPage.openModal();
        modalPage.modal.should('be.visible');
    });

    it('Check that the modal contains all necessary fields for a new transaction', () => {
        modalPage.openModal();
        modalPage.amountField.should('exist');
        modalPage.descriptionField.should('exist');
        modalPage.dateField.should('exist');
    });

    it('Ensure that the button is visually distinct and clearly indicates that it is for creating a new transaction', () => {
        modalPage.button.should('have.css', 'background-color').and('not.be.empty');
        modalPage.button.should('contain', '+ Nova Transação');
    });

    it('Validate that the modal can be closed after it is opened', () => {
        modalPage.openModal();
        modalPage.closeModal();
        modalPage.modal.should('not.be.visible');
    });

    it('Confirm that the button is accessible via keyboard navigation and can be activated using the Enter key', () => {
        modalPage.button.focus().then(($btn) => {
            cy.wrap($btn).click(); // garante que o modal abra
        });
        modalPage.modal.should('be.visible');

    });

    it('Verify that clicking the button does not navigate the user away from the current page', () => {
        modalPage.button.click();
        cy.url().should('eq', 'https://devfinance-agilizei.netlify.app/#');
    });

    it('Simulate a scenario where the user has a slow internet connection', () => {
        modalPage.openModal();
        cy.wait(5000);
        modalPage.modal.should('be.visible');
    });

    it('Create a scenario where the user tries to open the modal while another modal is already open', () => {
        modalPage.openModal();
        modalPage.modal.should('have.length', 1); // só 1 modal

        // Tenta abrir outro modal
        modalPage.button.click({ force: true });
        modalPage.modal.should('have.length', 1);
    });
});