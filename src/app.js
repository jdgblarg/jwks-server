const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const jwksRoutes = require('./routes/jwks');
const logger = require('./utils/logger');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/.well-known/jwks.json', jwksRoutes);

// Start the server
app.listen(PORT, () => {
    logger.info(`JWKS server is running on http://localhost:${PORT}`);
});