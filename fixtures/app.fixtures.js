
import { test as base, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';

export const test = base.extend({

    // Fixture 1: Authenticated Page
    authenticatedPage: async ({ browser }, use) => {

        // Create a new browser context
        const context = await browser.newContext({

            baseURL: 'https://playwrightlab.github.io',

            // Inject authentication data into local storage
            storageState: {
                cookies: [],
                origins: [
                    {
                        origin: 'https://playwrightlab.github.io',

                        localStorage: [
                            {
                                name: 'playlab-auth',
                                value: 'true'
                            },
                            {
                                name: 'playlab-user',
                                value: 'test@playlab.com'
                            }
                        ]
                    }
                ]
            }
        });

        // Create a new page
        const page = await context.newPage();

        try {
            await use(page);

        }
        finally {

            // Close the browser context
            await context.close();
        }

    },


    // Fixture 2: Registration Page
    registrationPage: async ({ authenticatedPage }, use) => {

        // Create an instance of RegistrationPage
        const registrationPage = new RegistrationPage(authenticatedPage);
        
        // Provide the RegistrationPage object to the test
        await use(registrationPage);
    }

});

export { expect };
