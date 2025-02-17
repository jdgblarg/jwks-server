const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary

describe('Authentication Endpoint', () => {
    it('should issue a valid JWT when no query parameter is provided', async () => {
        const response = await request(app)
            .post('/auth')
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        
        // Additional checks can be added to verify the JWT structure and claims
    });

    it('should issue a JWT signed with an expired key when "expired" query parameter is present', async () => {
        const response = await request(app)
            .post('/auth?expired=true')
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        
        // Additional checks can be added to verify the JWT structure and claims
    });

    it('should return a 400 status when invalid parameters are provided', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ invalid: 'parameter' });

        expect(response.status).toBe(400);
    });
});