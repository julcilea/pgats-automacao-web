class SignupPage {
    elements = {
        genderRadio: () => cy.get('input[type="radio"]'),
        passwordInput: () => cy.get('input[data-qa="password"]'),
        daysSelect: () => cy.get('select[data-qa="days"]'),
        monthsSelect: () => cy.get('select[data-qa="months"]'),
        yearsSelect: () => cy.get('select[data-qa="years"]'),
        newsletterCheckbox: () => cy.get('input[type=checkbox]#newsletter'),
        optinCheckbox: () => cy.get('input[type=checkbox]#optin'),
        firstNameInput: () => cy.get('input#first_name'),
        lastNameInput: () => cy.get('input#last_name'),
        companyInput: () => cy.get('input#company'),
        address1Input: () => cy.get('input#address1'),
        address2Input: () => cy.get('input#address2'),
        countrySelect: () => cy.get('select#country'),
        stateInput: () => cy.get('input#state'),
        cityInput: () => cy.get('input#city'),
        zipcodeInput: () => cy.get('input#zipcode'),
        mobileInput: () => cy.get('input#mobile_number'),
        createAccountButton: () => cy.get('button[data-qa="create-account"]'),
        accountCreatedTitle: () => cy.get('h2[data-qa="account-created"]')
    }

    fillAccountDetails(user) {
        this.elements.genderRadio().check('Mrs')
        this.elements.passwordInput().type(user.password, { log: false })

        this.elements.daysSelect().select('21')
        this.elements.monthsSelect().select('November')
        this.elements.yearsSelect().select('1979')

        this.elements.newsletterCheckbox().check()
        this.elements.optinCheckbox().check()

        this.elements.firstNameInput().type('QA')
        this.elements.lastNameInput().type('Tester')
        this.elements.companyInput().type('Teste Company')
        this.elements.address1Input().type('Rua Teste, 123')
        this.elements.address2Input().type('Bairro Teste')
        this.elements.countrySelect().select('Canada')
        this.elements.stateInput().type('State Teste')
        this.elements.cityInput().type('City Teste')
        this.elements.zipcodeInput().type('12345')
        this.elements.mobileInput().type('+5511999999999')

        return this
    }

    submitForm() {
        this.elements.createAccountButton().click()
        return this
    }
}

export default new SignupPage()
