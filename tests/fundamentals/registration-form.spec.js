
import { test, expect } from '@playwright/test';

test.describe('Registration Form Validation', () => {

  test('should display validation errors for empty required fields', async ({ page }) => {

    await page.goto('https://playwrightlab.github.io/?utm_source=chatgpt.com');

    // Click Register without filling any fields
    await page.getByTestId('btn-register').click();

    // Verify validation messages
    await expect(page.getByTestId('error-fullname')).not.toBeEmpty();
    await expect(page.getByTestId('error-email')).not.toBeEmpty();
    await expect(page.getByTestId('error-password')).not.toBeEmpty();
    await expect(page.getByTestId('error-terms')).not.toBeEmpty();

    // Verify registration was not successful
    await expect(page.getByTestId('form-success')).toBeHidden();

  });

test('should successfully register with valid information', async ({ page }) => {

    await page.goto('https://playwrightlab.github.io/?utm_source=chatgpt.com');

    // Fill textboxes
    await page.getByTestId('input-fullname').fill('Sedigheh Ahadi');

    await page.getByTestId('input-email').fill('ahadi.sedi@example.com');

    await page.getByTestId('input-password').fill('SecurePass123!');

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

    await page.goto('/');

    // Fill text fields
    await page.getByTestId('input-fullname').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-password').fill('Password123!');
    await page.getByTestId('input-phone').fill('+1 555 123 4567');

    // Select options
    await page.getByTestId('select-country').selectOption('de');
    await page.getByTestId('radio-female').check();
    await page.getByTestId('check-js').check();
    await page.getByTestId('check-python').check();
    await page.getByTestId('check-terms').check();

    // Fill the Bio field
    await page.getByTestId('textarea-bio').fill('Playwright learner');

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
})

