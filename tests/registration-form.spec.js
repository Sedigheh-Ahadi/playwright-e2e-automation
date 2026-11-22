
import { beforeEach } from 'node:test';
import { test, expect } from '../fixtures/app.fixtures.js';

test.beforeEach(async ({ registrationPage }) => {

  await registrationPage.goto();

});

test.describe('Registration Form Validation', () => {

  test('01-should successfully register with valid information', async ({ registrationPage }) => {

    await registrationPage.fillRequiredFields();
    await registrationPage.fillOptionalFields('+1 555 123 4567', '1995-06-15', 'Germany', 'I am a QA Automation Engineer working with Playwright.');
    await registrationPage.selectGender('female');
    await registrationPage.selectSkills(['javascript', 'python', 'java', 'csharp']);
    await registrationPage.acceptTerms();
    await registrationPage.submit();


    //Verify successful registration
    await expect(registrationPage.successMessage).toBeVisible();

  });

  test('02-should display validation errors for empty required fields', async ({ registrationPage }) => {

    await registrationPage.submit();

    // Verify validation messages
    await expect(registrationPage.fullNameError).toHaveText('Name is required');

    await expect(registrationPage.emailError).toHaveText('Valid email is required');

    await expect(registrationPage.passwordError).toHaveText('Password must be at least 8 characters');

    await expect(registrationPage.termsError).toHaveText('You must accept the terms');


    // Verify registration was not successful
    await expect(registrationPage.successMessage).toBeHidden();

  });

  test('03-should reset all registration form fields', async ({ registrationPage }) => {

    await registrationPage.fillRequiredFields();
    await registrationPage.fillOptionalFields('+1 555 123 4567', '1995-06-15', 'Germany', 'I am a QA Automation Engineer working with Playwright.');



    await registrationPage.fillRequiredFields();
    await registrationPage.fillOptionalFields('+1 555 123 4567', '1995-06-15', 'Germany', 'I am a QA Automation Engineer working with Playwright.');
    await registrationPage.selectGender('female');
    await registrationPage.selectSkills(['javascript', 'python', 'java', 'csharp']);
    await registrationPage.acceptTerms();

    // Click Reset
    await registrationPage.reset();

    // Verify text fields are empty
    await expect(registrationPage.fullNameInput).toHaveValue('');
    await expect(registrationPage.emailInput).toHaveValue('');
    await expect(registrationPage.passwordInput).toHaveValue('');
    await expect(registrationPage.phoneInput).toHaveValue('');
    await expect(registrationPage.bioTextarea).toHaveValue('');

    // Verify selections are reset
    await expect(registrationPage.countryDropdown).toHaveValue('');
    await expect(registrationPage.femaleRadio).not.toBeChecked();
    await expect(registrationPage.javascriptCheckbox).not.toBeChecked();
    await expect(registrationPage.pythonCheckbox).not.toBeChecked();
    await expect(registrationPage.javaCheckbox).not.toBeChecked();
    await expect(registrationPage.csharpCheckbox).not.toBeChecked();

  });

  test('04-should display an error for an invalid email format', async ({ registrationPage }) => {

    await registrationPage.fillRequiredFields({ email: 'invalidEmail' });

    await registrationPage.acceptTerms();
    await registrationPage.submit();


    await expect(registrationPage.emailError).toBeVisible();
    await expect(registrationPage.emailError).toHaveText('Valid email is required');

    await expect(registrationPage.successMessage).toBeHidden();



  })


  test('05-should allow selecting one gender and multiple skills', async ({ registrationPage }) => {

    // Select Female
    await registrationPage.selectGender('female');

    await expect(registrationPage.femaleRadio).toBeChecked();
    await expect(registrationPage.maleRadio).not.toBeChecked();

    // Change gender to Male
    await registrationPage.selectGender('male');

    await expect(registrationPage.maleRadio).toBeChecked();
    await expect(registrationPage.femaleRadio).not.toBeChecked();

    // Select multiple skills
    await registrationPage.selectSkills(['javascript', 'python', 'java']);


    // Verify multiple selections
    await expect(registrationPage.javascriptCheckbox).toBeChecked();
    await expect(registrationPage.pythonCheckbox).toBeChecked();
    await expect(registrationPage.javaCheckbox).toBeChecked();

  });

  test('06-should display an error when password is shorter than 8 characters', async ({ registrationPage }) => {


    // Fill required fields with valid data, except password
    await registrationPage.fillRequiredFields({
      password: 'Abc123!'
    });

    // Accept Terms & Conditions
    await registrationPage.acceptTerms();

    // Verify password length is less than 8
    expect('Abc123!'.length).toBeLessThan(8);

    // Click Register
    await registrationPage.submit();

    // Verify password validation error

    await expect(registrationPage.passwordError).toBeVisible();
    await expect(registrationPage.passwordError).toHaveText('Password must be at least 8 characters');

    // Verify registration was unsuccessful
    await expect(registrationPage.successMessage).toBeHidden();

  });


  test('07-should not allow more than 50 characters in full name', async ({ registrationPage }) => {


    const longName = 'A'.repeat(60);

    // Enter 60 characters
    await registrationPage.fullNameInput.pressSequentially(longName);

    // Verify that only 50 characters are accepted
    await expect(registrationPage.fullNameInput).toHaveValue('A'.repeat(50));

    // Verify the maximum length attribute
    await expect(registrationPage.fullNameInput).toHaveAttribute('maxlength', '50');

  });


  test.only('08-should allow selecting a country from the dropdown', async ({ registrationPage }) => {


    // Verify the default value
    await expect(registrationPage.countryDropdown).toHaveValue('');

    // Select Germany
    await registrationPage.countryDropdown.selectOption('Germany');

    // Verify the selected value
    await expect(registrationPage.countryDropdown).toHaveValue('de');

    // Verify the selected option text
    await expect(registrationPage.getSelectedOption())
      .toHaveText('Germany');

    // Change the selected country to France
    await registrationPage.countryDropdown.selectOption('France');

    // Verify the new selection
    await expect(registrationPage.countryDropdown).toHaveValue('fr');

    await expect(registrationPage.getSelectedOption())
      .toHaveText('France');

  });


})

