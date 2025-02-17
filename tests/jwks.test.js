const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary

describe('JWKS Endpoint', () => {
    it('should return valid JWKs', async () => {
        const response = await request(app).get('/jwks');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('keys');
        expect(Array.isArray(response.body.keys)).toBe(true);
        response.body.keys.forEach(key => {
            expect(key).toHaveProperty('kty', 'RSA');
            expect(key).toHaveProperty('kid');
            expect(key).toHaveProperty('n');
            expect(key).toHaveProperty('e');
        });
    });

    it('should not return expired JWKs', async () => {
        const response = await request(app).get('/jwks');
        const expiredKeys = response.body.keys.filter(key => {
            const currentTime = Math.floor(Date.now() / 1000);
            return key.exp && key.exp < currentTime;
        });
        expect(expiredKeys.length).toBe(0);
    });
});