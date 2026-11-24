
export class AuthAPI {

    constructor(request) {
        this.request = request;
    }

    async registerClient({ clientName, clientEmail }) {

        return await this.request.post('/api-clients', {
            data: {
                clientName,
                clientEmail
            }
        });
    }
}
