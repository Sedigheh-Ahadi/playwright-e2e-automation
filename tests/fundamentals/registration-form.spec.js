
import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

async function fillRequiredFields(
    page,
    { email = 'giti@gmail.com', password = 'StrongPass123!', fullname= 'giti rahimi' } = {}
  ) {
    await page.getByTestId('input-fullname').fill(fullname);
    await page.getByTestId('input-email').fill(email);
    await page.getByTestId('input-password').fill(password);
  }

  
test.describe('Registration Form Validation', () => {

  test.beforeEach(async ({ page }) => {
      await page.goto('https://playwrightlab.github.io');
    });
  
  test('should display validation errors for empty required fields', async ({ page }) => {
  

    // Click Register without filling any fields
    await page.getByTestId('btn-register').click();

    // Verify validation messages
    await expect(page.getByTestId('error-fullname')).not.toBeEmpty();
    await expect(page.getByTestId('error-fullname')).toHaveText('Name is required');

    await expect(page.getByTestId('error-email')).not.toBeEmpty();
    await expect(page.getByTestId('error-email')).toHaveText('Valid email is required');

    await expect(page.getByTestId('error-password')).not.toBeEmpty();
    await expect(page.getByTestId('error-password')).toHaveText('Password must be at least 8 characters');


    await expect(page.getByTestId('error-terms')).not.toBeEmpty();
    await expect(page.getByTestId('error-terms')).toHaveText('You must accept the terms');
    // Verify registration was not successful
    await expect(page.getByTestId('form-success')).toBeHidden();

  });

  test('should successfully register with valid information', async ({ page }) => {

        // Fill textboxes
    fillRequiredFields(page);

    await page.getByTestId('input-phone').fill('+1 555 123 4567');

    // Fill date of birth
    await page.getByTestId('input-dob').fill('1995-06-15');

    // Select country
    await page.getByTestId('select-country').selectOption('de');

    // Select gender
    await page.getByTestId('radio-female').check();

    // Select skills
    await page.getByTestId('check-js').check();
    await page.getByTestId('check-python').check();
    await page.getByTestId('check-java').check();
    await page.getByTestId('check-csharp').check();

    // Fill biography
    await page.getByTestId('textarea-bio').fill(
      'I am a QA Automation Engineer working with Playwright.'
    );

    // Accept terms and conditions
    await page.getByTestId('check-terms').check();

    // Submit registration
    await page.getByTestId('btn-register').click();

    // Verify successful registration
    await expect(page.getByTestId('form-success')).toBeVisible();

  });

  test('should reset all registration form fields', async ({ page }) => {


    // Fill text fields
    fillRequiredFields(page);
    await page.getByTestId('input-phone').fill('+1 555 123 4567');

    // Select options
    await page.getByTestId('select-country').selectOption('de');
    await page.getByTestId('radio-female').check();
    await page.getByTestId('check-js').check();
    await page.getByTestId('check-python').check();
    await page.getByTestId('check-terms').check();

    // Fill the Bio field
    await page.getByTestId('textarea-bio').fill('Playwright developer');

    // Click Reset
    await page.getByTestId('btn-reset').click();

    // Verify text fields are empty
    await expect(page.getByTestId('input-fullname')).toHaveValue('');
    await expect(page.getByTestId('input-email')).toHaveValue('');
    await expect(page.getByTestId('input-password')).toHaveValue('');
    await expect(page.getByTestId('input-phone')).toHaveValue('');
    await expect(page.getByTestId('textarea-bio')).toHaveValue('');

    // Verify selections are reset
    await expect(page.getByTestId('select-country')).toHaveValue('');
    await expect(page.getByTestId('radio-female')).not.toBeChecked();
    await expect(page.getByTestId('check-js')).not.toBeChecked();
    await expect(page.getByTestId('check-python')).not.toBeChecked();
    await expect(page.getByTestId('check-terms')).not.toBeChecked();

  });

  test('should display an error for an invalid email format', async ({ page }) => {

    fillRequiredFields(page, {email:'inavalid-email'});
    await page.getByTestId('check-terms').check();
    await page.getByTestId('btn-register').click();

    const emailError = page.getByTestId('error-email');

    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText('Valid email is required');

    await expect(page.getByTestId('form-success')).toBeHidden();



  })


test('should allow selecting one gender and multiple skills', async ({ page }) => {

    // Select Female
    await page.getByTestId('radio-female').check();

    await expect(page.getByTestId('radio-female')).toBeChecked();
    await expect(page.getByTestId('radio-male')).not.toBeChecked();

    // Change gender to Male
    await page.getByTestId('radio-male').check();

    await expect(page.getByTestId('radio-male')).toBeChecked();
    await expect(page.getByTestId('radio-female')).not.toBeChecked();

    // Select multiple skills
    await page.getByTestId('check-js').check();
    await page.getByTestId('check-python').check();
    await page.getByTestId('check-java').check();

    // Verify multiple selections
    await expect(page.getByTestId('check-js')).toBeChecked();
    await expect(page.getByTestId('check-python')).toBeChecked();
    await expect(page.getByTestId('check-java')).toBeChecked();

});




test('should display an error when password is shorter than 8 characters', async ({ page }) => {

      await page.goto('https://playwrightlab.github.io');

    // Fill required fields with valid data, except password
    await fillRequiredFields(page, {
        password: 'Abc123!'
    });

    // Accept Terms & Conditions
    await page.getByTestId('check-terms').check();

    // Verify password length is less than 8
    expect('Abc123!'.length).toBeLessThan(8);

    // Click Register
    await page.getByTestId('btn-register').click();

    // Verify password validation error
    const passwordError = page.getByTestId('error-password');

    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText('Password must be at least 8 characters');

    // Verify registration was unsuccessful
    await expect(page.getByTestId('form-success')).toBeHidden();

});


})

