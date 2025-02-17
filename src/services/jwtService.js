const jwt = require('jsonwebtoken');
const { getKeyById } = require('./keyGenerator');

const JWT_SECRET = process.env.JWT_SECRET || 'your-256-bit-secret'; // Replace with your secret
const JWT_EXPIRY = '1h'; // Set the desired expiry time for the JWT

const createToken = (kid) => {
    const payload = { /* Add any claims you want to include */ };
    const options = { algorithm: 'RS256', expiresIn: JWT_EXPIRY, keyid: kid };
    const privateKey = getKeyById(kid).privateKey; // Retrieve the private key using the kid
    return jwt.sign(payload, privateKey, options);
};

const issueToken = (expired) => {
    const kid = expired ? 'expired-key-id' : 'active-key-id'; // Replace with actual logic to get the appropriate kid
    return createToken(kid);
};

module.exports = {
    createToken,
    issueToken,
};