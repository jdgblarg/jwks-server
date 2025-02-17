const jwt = require('jsonwebtoken');
const { generateKid, generateKey } = require('./keyGenerator');

const JWT_SECRET = '2223226c3965ff9da7bf26f68be7ee287f766853145d8531cfbe8a371bd3a658'; // Replace with your secret
const JWT_EXPIRY = '1h'; // Set the desired expiry time for the JWT

const createToken = (kid) => {
    const payload = { /* Add any claims you want to include */ };
    const options = { algorithm: 'RS256', expiresIn: JWT_EXPIRY, keyid: kid };
    const privateKey = generateKey( kid ).privateKey; // Retrieve the private key using the kid

    return jwt.sign(payload, privateKey, options);
};

const issueToken = (expired) => {
    const kid = JWT_SECRET //expired ? 'expired-key-id' : 'active-key-id'; // Replace with actual logic to get the appropriate kid
    return createToken(kid);
};

module.exports = {
    createToken,
    issueToken,
};