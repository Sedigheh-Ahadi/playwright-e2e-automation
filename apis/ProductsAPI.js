
export class ProductsAPI {

    constructor(request) {
        this.request = request;
    }

    // Get all products with optional filters
    async getAllProducts({
        category,
        results,
        available
    } = {}) {

        const params = {};

        if (category !== undefined) {
            params.category = category;
        }

        if (results !== undefined) {
            params.results = results;
        }

        if (available !== undefined) {
            params.available = available;
        }

        return await this.request.get('/products', {
            params
        });
    }

    // Get a specific product by ID
    async getProduct(productId, { productLabel } = {}) {

        const params = {};

        if (productLabel !== undefined) {
            params['product-label'] = productLabel;
        }

        return await this.request.get(`/products/${productId}`, {
            params
        });
    }
}
