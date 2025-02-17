const express = require('express');
const bodyParser = require('body-parser');

const jwtService = require('./services/jwtService');
const keyGenerator = require( './services/keyGenerator' );
const { getValidKeys } = require( './services/keyGenerator' );

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get( '/test', ( req, res ) => {
    res.json( { message: 'Hello, World!' } );
} );

app.get('/.well-known/jwks.json', (req, res) => {
    const keys = getValidKeys();
    res.json({ keys });
});


app.post('/auth', (req, res) => {
    const { expired } = req.query;

    let keyPair;
    if ( expired ) {
        console.log( 'expired' );
        keyPair = keyGenerator.getExpiredKeyPair(); // Function to get an expired key pair
    } else {
        keyPair = keyGenerator.generateKey(); // Function to get an active key pair
    }

    const token = jwtService.issueToken({ user: 'fakeUser' }, keyPair);
    res.json({ token });
} );


// Start the server
app.listen(PORT, () => {
    console.log(`JWKS server is running on http://localhost:${PORT}`);
});