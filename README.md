# JWKS Server

This project implements a RESTful JSON Web Key Set (JWKS) server that provides public keys for verifying JSON Web Tokens (JWTs). The server includes key expiry for enhanced security and features an authentication endpoint for issuing JWTs.

## Features

- **JWKS Endpoint**: Serves public keys in JWKS format, filtering out expired keys.
- **Authentication Endpoint**: Issues signed JWTs based on user requests, with support for expired keys.
- **Key Management**: Generates RSA key pairs with unique identifiers (kid) and expiry timestamps.

## Project Structure

```
jwks-server
├── src
│   ├── app.js              # Main entry point of the server
│   ├── routes
│   │   ├── auth.js         # Handles authentication requests
│   │   └── jwks.js         # Handles JWKS requests
│   ├── services
│   │   ├── keyGenerator.js  # Key generation logic
│   │   └── jwtService.js    # JWT creation and signing
│   └── utils
│       └── logger.js        # Logging utility
├── tests
│   ├── auth.test.js        # Tests for authentication endpoint
│   ├── jwks.test.js        # Tests for JWKS endpoint
│   └── keyGenerator.test.js # Tests for key generation
├── package.json             # Project dependencies and scripts
├── .eslintrc.json          # ESLint configuration
├── .gitignore               # Files to ignore in Git
└── README.md                # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd jwks-server
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the server**:
   ```
   npm start
   ```

4. **Access the API**:
   - JWKS Endpoint: `GET http://localhost:8080/jwks`
   - Authentication Endpoint: `POST http://localhost:8080/auth?expired=false`

## Usage

- To obtain valid JWTs, send a POST request to the `/auth` endpoint.
- To retrieve the JWKS, send a GET request to the `/jwks` endpoint.

## Testing

To run the test suite, use the following command:

```
npm test
```

Ensure that the test coverage is above 80% for all components.

## License

This project is for educational purposes only. In a production environment, ensure to integrate with a proper authentication system and follow security best practices.