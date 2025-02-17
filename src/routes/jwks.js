const express = require('express');
const { getKeys } = require('../services/keyGenerator');

const router = express.Router();

router.get('/.well-known/jwks.json', (req, res) => {
    const keys = getKeys();
    res.json({ keys });
});

module.exports = router;