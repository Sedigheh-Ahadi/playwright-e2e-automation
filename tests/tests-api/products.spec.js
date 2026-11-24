
import { test, expect } from '../../fixtures/api.fixtures.js';

test.describe('Products API', () => {

    // Test 1: Get all products with default parameters
    test('should return the default maximum of 20 products', async ({ productsApi }) => {

        const response = await productsApi.getAllProducts();

        expect(response.status()).toBe(200);

        const products = await response.json();

        expect(Array.isArray(products)).toBe(true);
        expect(products).toHaveLength(20);

    });


    // Test 2: Filter products by category and availability
    for (const available of [true, false]) {

        test(`should return only coffee products with available = ${available}`, async ({ productsApi }) => {

            const category = 'coffee';

            const response = await productsApi.getAllProducts({
                category,
                available
            });

            expect(response.status()).toBe(200);

            const products = await response.json();

            expect(products.length).toBeLessThanOrEqual(20);

            // Verify category for every returned product
            expect(
                products.every(product => product.category === category)
            ).toBe(true);

            // Verify availability for every returned product
            expect(
                products.every(product => product.inStock === available)
            ).toBe(true);

        });

    }


    // Test 3: Request more than the maximum allowed results
    test('should return 400 when results parameter exceeds 20', async ({ productsApi }) => {

        const response = await productsApi.getAllProducts({
            results: 21
        });

        expect(response.status()).toBe(400);

    });

});
