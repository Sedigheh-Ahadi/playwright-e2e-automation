
export class OrdersAPI {

    constructor(request) {
        this.request = request;
    }

    // Get all orders created by the API client
    async getAllOrders() {

        return this.request.get('/orders');
    }

    // Get a single order by ID
    async getOrder(orderId, { invoice } = {}) {

        const params = {};

        if (invoice !== undefined) {
            params.invoice = invoice;
        }

        return this.request.get(
            `/orders/${encodeURIComponent(orderId)}`,
            { params }
        );
    }

}

