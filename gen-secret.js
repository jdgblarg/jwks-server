const crypto = require('crypto');

const generateSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // 32 bytes * 8 bits/byte = 256 bits
};

const secret = generateSecret();
console.log(secret);