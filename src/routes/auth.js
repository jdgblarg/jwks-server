const express = require('express');
const jwtService = require('../services/jwtService');
const keyGenerator = require('../services/keyGenerator');

const router = express.Router();

router.post('/auth', (req, res) => {
    const { expired } = req.query;

    let keyPair;
    if (expired) {
        keyPair = keyGenerator.getExpiredKeyPair(); // Function to get an expired key pair
    } else {
        keyPair = keyGenerator.getActiveKeyPair(); // Function to get an active key pair
    }

    const token = jwtService.signToken({ user: 'fakeUser' }, keyPair);
    res.json({ token });
});

module.exports = router;