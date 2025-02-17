const { generateKeyPairSync } = require( 'crypto' );

const keys = new Map();

function generateKey() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    const kid = generateKid();
    const expiry = Date.now() + 3600 * 1000; // 1 hour expiry

    keys.set(kid, {
        publicKey,
        privateKey,
        expiry,
    });

    return { kid, publicKey, expiry, privateKey };
}

function generateKid() {
    return `key-${ Date.now() }`;
}

function getValidKeys() {
    const validKeys = [];
    keys.forEach((value, key) => {
        if (value.expiry > Date.now()) {
            validKeys.push({
                kty: 'RSA',
                kid: key,
                use: 'sig',
                n: value.publicKey.export({ format: 'spki', type: 'spki' }).toString('base64'),
                e: 'AQAB', // Assuming public exponent is always 65537
            });
        }
    });
    return validKeys;
}

getExpiredKeyPair = () => {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    const kid = generateKid();
    const expiry = Date.now() - 3600 * 1000; // 1 hour expiry

    keys.set(kid, {
        publicKey,
        privateKey,
        expiry,
    });
    console.log( `Generated key with kid: ${ kid }` );
    
    console.log(`Public Key: ${publicKey.export({ format: 'pem', type: 'pkcs1' })}`);
    console.log(`Private Key: ${privateKey.export({ format: 'pem', type: 'pkcs1' })}`);

    return { kid, publicKey, expiry, privateKey };
};

module.exports = {
    generateKey,
    getValidKeys,
    generateKid,
    getExpiredKeyPair,
};