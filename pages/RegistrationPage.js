
export class RegistrationPage {

    constructor(page) {
        this.page = page;

        // Required fields
        this.fullNameInput = page.getByTestId('input-fullname');
        this.emailInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');

        // Optional fields
        this.phoneInput = page.getByTestId('input-phone');
        this.dateOfBirthInput = page.getByTestId('input-dob');
        this.countryDropdown = page.getByTestId('select-country');

        // Gender radio buttons
        this.maleRadio = page.getByTestId('radio-male');
        this.femaleRadio = page.getByTestId('radio-female');
        this.otherRadio = page.getByTestId('radio-other');

        // Skills checkboxes
        this.javascriptCheckbox = page.getByTestId('check-js');
        this.pythonCheckbox = page.getByTestId('check-python');
        this.javaCheckbox = page.getByTestId('check-java');
        this.csharpCheckbox = page.getByTestId('check-csharp');

        // Bio
        this.bioTextarea = page.getByTestId('textarea-bio');
        this.characterCounter = page.getByTestId('char-count');

        // Terms and Conditions
        this.termsCheckbox = page.getByTestId('check-terms');
        this.termsLink = page.getByTestId('terms-link');

        // Buttons
        this.registerButton = page.getByTestId('btn-register');
        this.resetButton = page.getByTestId('btn-reset');
        this.passwordToggleButton = page.getByTestId('toggle-password');

        // Validation messages
        this.fullNameError = page.getByTestId('error-fullname');
        this.emailError = page.getByTestId('error-email');
        this.passwordError = page.getByTestId('error-password');
        this.termsError = page.getByTestId('error-terms');

        // Success message
        this.successMessage = page.getByTestId('form-success');
    }

    // Navigation
    async goto() {
        await this.page.goto('https://playwrightlab.github.io');
    }

    // Fill required fields
    async fillRequiredFields({
        fullName = 'Sedigheh Ahadi',
        email = 'Sedi@example.com',
        password = 'StrongPass123!'
    } = {}) {

        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    // Fill optional fields
    async fillOptionalFields({
        phone,
        dateOfBirth,
        country,
        bio
    } = {}) {

        if (phone !== undefined)
            await this.phoneInput.fill(phone);

        if (dateOfBirth !== undefined)
            await this.dateOfBirthInput.fill(dateOfBirth);

        if (country !== undefined)
            await this.countryDropdown.selectOption({ label: country });

        if (bio !== undefined)
            await this.bioTextarea.fill(bio);
    }

    // Select gender
    async selectGender(gender) {

        const genderOptions = {
            male: this.maleRadio,
            female: this.femaleRadio,
            other: this.otherRadio
        };

        await genderOptions[gender].check();
    }

    // Select skills
    async selectSkills(skills = []) {

        const skillOptions = {
            javascript: this.javascriptCheckbox,
            python: this.pythonCheckbox,
            java: this.javaCheckbox,
            csharp: this.csharpCheckbox
        };

        for (const skill of skills) {
            await skillOptions[skill].check();
        }
    }

    // Fill Bio
    async fillBio(bio) {
        await this.bioTextarea.fill(bio);
    }

    // Accept Terms
    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    // Submit registration
    async submit() {
        await this.registerButton.click();
    }

    // Reset form
    async reset() {
        await this.resetButton.click();
    }

    // Toggle password visibility
    async togglePasswordVisibility() {
        await this.passwordToggleButton.click();
    }
    getSelectedOption() {
        return this.countryDropdown.locator('option:checked');
    }

}
