
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

     // Test 3: Update item quantity
    test('should update the quantity of an existing cart item', async ({
        cartApi,
        productsApi
    }) => {

        const productsResponse = await productsApi.getAllProducts({
            available: true
        });

        const products = await productsResponse.json();
        const selectedProduct = products[0];

        const cartResponse = await cartApi.createCart();
        const { cartId } = await cartResponse.json();

        await cartApi.addItem(cartId, {
            productId: selectedProduct.id
        });

        // Get the item ID
        const itemsResponse = await cartApi.getCartItems(cartId);
        const cartItems = await itemsResponse.json();

        const cartItem = cartItems.find(
            item => item.productId === selectedProduct.id
        );

        expect(cartItem).toBeTruthy();

        // Update quantity
        const updateResponse = await cartApi.updateItem(
            cartId,
            cartItem.id,
            { quantity: 3 }
        );

        expect(updateResponse.status()).toBe(204);

        // Verify updated quantity
        const updatedItemsResponse = await cartApi.getCartItems(cartId);
        const updatedItems = await updatedItemsResponse.json();

        const updatedItem = updatedItems.find(
            item => item.productId === selectedProduct.id
        );

        expect(updatedItem.quantity).toBe(3);
    });


    // Test 4: Replace an item in cart
    test('should replace an existing cart item', async ({
        cartApi,
        productsApi
    }) => {

        const productsResponse = await productsApi.getAllProducts({
            available: true
        });

        const products = await productsResponse.json();

        expect(products.length).toBeGreaterThan(1);

        const firstProduct = products[0];
        const replacementProduct = products[1];

        const cartResponse = await cartApi.createCart();
        const { cartId } = await cartResponse.json();

        await cartApi.addItem(cartId, {
            productId: firstProduct.id
        });

        const itemsResponse = await cartApi.getCartItems(cartId);
        const cartItems = await itemsResponse.json();

        const cartItem = cartItems.find(
            item => item.productId === firstProduct.id
        );

        expect(cartItem).toBeTruthy();

        // Replace the existing product
        const replaceResponse = await cartApi.replaceItem(
            cartId,
            cartItem.id,
            {
                productId: replacementProduct.id,
                quantity: 2
            }
        );

        expect(replaceResponse.status()).toBe(204);

        // Verify replacement
        const updatedItemsResponse = await cartApi.getCartItems(cartId);
        const updatedItems = await updatedItemsResponse.json();

        expect(
            updatedItems.some(
                item => item.productId === replacementProduct.id
            )
        ).toBe(true);

        expect(
            updatedItems.some(
                item => item.productId === firstProduct.id
            )
        ).toBe(false);
    });
    // Test 5: Replace an item in cart
    test('should replace an existing cart item', async ({
        cartApi,
        productsApi
    }) => {

        const productsResponse = await productsApi.getAllProducts({
            available: true
        });

        const products = await productsResponse.json();

        expect(products.length).toBeGreaterThan(1);

        const firstProduct = products[0];
        const replacementProduct = products[1];

        const cartResponse = await cartApi.createCart();
        const { cartId } = await cartResponse.json();

        await cartApi.addItem(cartId, {
            productId: firstProduct.id
        });

        const itemsResponse = await cartApi.getCartItems(cartId);
        const cartItems = await itemsResponse.json();

        const cartItem = cartItems.find(
            item => item.productId === firstProduct.id
        );

        expect(cartItem).toBeTruthy();

        // Replace the existing product
        const replaceResponse = await cartApi.replaceItem(
            cartId,
            cartItem.id,
            {
                productId: replacementProduct.id,
                quantity: 2
            }
        );

        expect(replaceResponse.status()).toBe(204);

        // Verify replacement
        const updatedItemsResponse = await cartApi.getCartItems(cartId);
        const updatedItems = await updatedItemsResponse.json();

        expect(
            updatedItems.some(
                item => item.productId === replacementProduct.id
            )
        ).toBe(true);

        expect(
            updatedItems.some(
                item => item.productId === firstProduct.id
            )
        ).toBe(false);
    });


    // Test 4: Remove an item from cart
    test('should remove an item from cart', async ({
        cartApi,
        productsApi
    }) => {

        const productsResponse = await productsApi.getAllProducts({
            available: true
        });

        const products = await productsResponse.json();
        const selectedProduct = products[0];

        const cartResponse = await cartApi.createCart();
        const { cartId } = await cartResponse.json();

        await cartApi.addItem(cartId, {
            productId: selectedProduct.id
        });

        const itemsResponse = await cartApi.getCartItems(cartId);
        const cartItems = await itemsResponse.json();

        const cartItem = cartItems.find(
            item => item.productId === selectedProduct.id
        );

        expect(cartItem).toBeTruthy();

        // Delete item
        const deleteResponse = await cartApi.deleteItem(
            cartId,
            cartItem.id
        );

        expect(deleteResponse.status()).toBe(204);

        // Verify item removal
        const updatedItemsResponse = await cartApi.getCartItems(cartId);
        const updatedItems = await updatedItemsResponse.json();

        expect(
            updatedItems.some(
                item => item.productId === selectedProduct.id
            )
        ).toBe(false);
    });

});
