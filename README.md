# External Recording API Server

A fully working external API server for call recording integrations.

This server provides:

- Token generation
- MP3 recording uploads
- Call metadata storage
- Bearer token authentication
- JSON-based storage
- Public API endpoints

---

# Features

- OAuth-style token authentication
- MP3/WAV file upload support
- Recording metadata APIs
- Express.js backend
- JSON file database
- Ready for Render deployment

---

# API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| /api/token | POST | Generate access token |
| /api/upload | POST | Upload recording |
| /api/create-record | POST | Create metadata record |
| /api/health | GET | Health check |

---

# Technologies Used

- Node.js
- Express.js
- Multer
- JSON Web Token
- Body Parser
- CORS

---

# Installation

## Clone Repository

```bash
git clone https://github.com/jebyjoseph/api-server.git
cd api-server
