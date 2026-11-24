
import { test as base, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { AuthAPI } from '../apis/AuthAPI.js';
import { ProductsAPI } from '../apis/ProductsAPI.js';




const BASE_URL = 'https://simple-grocery-store-api.glitch.me';

export const test = base.extend({

    // Fixture 1: Unauthenticated API request context
    apiRequest: [
        async ({ playwright }, use) => {

            const apiRequest = await playwright.request.newContext({
                baseURL: BASE_URL
            });

            try {
                await use(apiRequest);
            }
            finally {
                await apiRequest.dispose();
            }
        },
        { scope: 'test' }
    ],

    // Fixture 2: AuthAPI instance
    authApi: [
        async ({ apiRequest }, use) => {

            const authApi = new AuthAPI(apiRequest);

            await use(authApi);
        },
        { scope: 'test' }
    ],

    // Fixture 3: Authenticated API request context
    authenticatedApiRequest: [
        async ({ playwright, authApi }, use) => {

            const response = await authApi.registerClient({
                clientName: 'Playwright Automation',
                clientEmail: `playwright-${randomUUID()}@example.com`
            });

            if (!response.ok()) {
                throw new Error(
                    `API client registration failed: ${response.status()} ${await response.text()}`
                );
            }

            const responseBody = await response.json();
            const accessToken = responseBody.accessToken;

            if (!accessToken) {
                throw new Error('Access token was not returned.');
            }

            const authenticatedApiRequest =
                await playwright.request.newContext({
                    baseURL: BASE_URL,
                    extraHTTPHeaders: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

            try {
                await use(authenticatedApiRequest);
            }
            finally {
                await authenticatedApiRequest.dispose();
            }
        },
        { scope: 'test' }
    ],

    // Fixture 4: User session
    userSession: [
        async ({ apiRequest, authenticatedApiRequest }, use) => {

            await use({
                unauthenticatedApiRequest: apiRequest,
                authenticatedApiRequest: authenticatedApiRequest
            });

        },
        { scope: 'test' }
    ],
    // Fixture: Products API
    productsApi: [
        async ({ apiRequest }, use) => {

            const productsApi = new ProductsAPI(apiRequest);

            await use(productsApi);

        },
        { scope: 'test' }
    ],

});

export { expect };
