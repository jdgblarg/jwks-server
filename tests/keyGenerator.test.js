const { generateKeyPairSync } = require('crypto');
const { expect } = require('chai');
const { generateKey } = require('../src/services/keyGenerator');

describe('Key Generator Service', () => {
    it('should generate a valid RSA key pair with kid and expiry', () => {
        const { publicKey, privateKey, kid, expiry } = generateKey();

        expect(publicKey).to.exist;
        expect(privateKey).to.exist;
        expect(kid).to.exist;
        expect(expiry).to.exist;

        const currentTime = Math.floor(Date.now() / 1000);
        expect(expiry).to.be.greaterThan(currentTime);
    });

    it('should generate unique kid for each key', () => {
        const keys = new Set();
        for (let i = 0; i < 10; i++) {
            const { kid } = generateKey();
            keys.add(kid);
        }
        expect(keys.size).to.equal(10);
    });
});