
export class CartAPI {

    constructor(api) {
        this.api = api;
    }

    // Get a cart
    getCart(cartId) {

        return this.api.get(
            `/carts/${encodeURIComponent(cartId)}`
        );

    }

    // Get all items in a cart
    getCartItems(cartId) {

        return this.api.get(
            `/carts/${encodeURIComponent(cartId)}/items`
        );

    }

    // Create a new empty cart
    createCart() {

        return this.api.post('/carts');

    }

    // Add an item to a cart
    addItem(cartId, { productId, quantity }) {

        return this.api.post(
            `/carts/${encodeURIComponent(cartId)}/items`,
            {
                data: {
                    productId,
                    ...(quantity !== undefined ? { quantity } : {})
                }
            }
        );

    }

    // Modify the quantity of an existing cart item
    modifyItem(cartId, itemId, quantity) {

        return this.api.patch(
            `/carts/${encodeURIComponent(cartId)}/items/${encodeURIComponent(itemId)}`,
            {
                data: {
                    quantity
                }
            }
        );

    }

    // Replace an existing cart item
    replaceItem(cartId, itemId, { productId, quantity }) {

        return this.api.put(
            `/carts/${encodeURIComponent(cartId)}/items/${encodeURIComponent(itemId)}`,
            {
                data: {
                    productId,
                    ...(quantity !== undefined ? { quantity } : {})
                }
            }
        );

    }

    // Delete an item from a cart
    deleteItem(cartId, itemId) {

        return this.api.delete(
            `/carts/${encodeURIComponent(cartId)}/items/${encodeURIComponent(itemId)}`
        );

    }

}
