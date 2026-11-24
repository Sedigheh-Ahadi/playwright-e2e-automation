
import { test, expect } from '../../fixtures/api.fixtures.js';

test.describe('Cart API - Integration Tests', () => {

    // Test 1: Create a new cart
    test('should create a new cart', async ({ cartApi }) => {

        const response = await cartApi.createCart();

        expect(response.status()).toBe(201);

        const cart = await response.json();

        expect(cart.created).toBe(true);
        expect(cart.cartId).toBeTruthy();
    });


    // Test 2: Add an available product to cart
    test('should add an available product to cart', async ({
        cartApi,
        productsApi
    }) => {

        // Get available products
        const productsResponse = await productsApi.getAllProducts({
            available: true
        });

        expect(productsResponse.status()).toBe(200);

        const products = await productsResponse.json();

        expect(products.length).toBeGreaterThan(0);

        // Select a product
        const selectedProduct = products[0];

        // Create a new cart
        const cartResponse = await cartApi.createCart();

        expect(cartResponse.status()).toBe(201);

        const { cartId } = await cartResponse.json();

        // Add product to cart
        const addResponse = await cartApi.addItem(cartId, {
            productId: selectedProduct.id
        });

        expect(addResponse.status()).toBe(201);

        // Get cart items
        const itemsResponse = await cartApi.getCartItems(cartId);

        expect(itemsResponse.status()).toBe(200);

        const cartItems = await itemsResponse.json();

        // Verify that the selected product exists in cart
        expect(
            cartItems.some(item => item.productId === selectedProduct.id)
        ).toBe(true);
    });


});
