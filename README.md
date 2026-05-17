# External Recording API Server

A fully working external API server for call recording integrations.

This project provides:

- Token generation API
- Recording upload API
- Metadata creation API
- Bearer token authentication
- MP3/WAV upload support
- JSON-based storage
- Public deployment support

---

# Features

- OAuth-style token authentication
- File upload support
- Metadata APIs
- REST API architecture
- Express.js backend
- JSON file database
- Public hosting support
- Render deployment ready

---

# Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | Web server |
| Multer | File uploads |
| JSON Web Token | Token generation |
| Body Parser | Request parsing |
| CORS | Cross-origin support |
| UUID | Generate unique IDs |

---

# System Requirements

| Requirement | Version |
|---|---|
| Node.js | 18+ Recommended |
| npm | Latest |
| Git | Latest |

---

# Step 1 — Install Node.js

Download and install Node.js:

https://nodejs.org

After installation verify:

```bash
node -v
npm -v
```

Example:

```txt
v22.0.0
10.5.1
```

---

# Step 2 — Install Git

Download:

https://git-scm.com/download/win

Verify installation:

```bash
git --version
```

---

# Step 3 — Create Project Folder

Create a folder:

```txt
C:\api-server
```

Open terminal inside the folder.

---

# Step 4 — Initialize Node Project

Run:

```bash
npm init -y
```

This creates:

```txt
package.json
```

---

# Step 5 — Install Dependencies

Run:

```bash
npm install express multer cors jsonwebtoken body-parser uuid
```

---

# Dependency Explanation

| Package | Purpose |
|---|---|
| express | API server |
| multer | File upload handling |
| cors | Enable CORS |
| jsonwebtoken | Create bearer tokens |
| body-parser | Parse request bodies |
| uuid | Generate unique IDs |

---

# Step 6 — Create Folder Structure

Create the following structure:

```txt
external-recording-api/
│
├── server.js
├── package.json
├── uploads/
└── database/
    ├── tokens.json
    ├── uploads.json
    └── records.json
```

---

# Step 7 — Create Database Files

Inside:

```txt
database/
```

Create:

## tokens.json

```json
[]
```

## uploads.json

```json
[]
```

## records.json

```json
[]
```

---

# Step 8 — Configure package.json

Update:

```json
"scripts": {
  "start": "node server.js"
}
```

Final example:

```json
{
  "name": "api-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}
```

---

# Step 9 — Create server.js

Create:

```txt
server.js
```

Paste your API server code.

---

# Step 10 — Start Server

Run:

```bash
node server.js
```

or:

```bash
npm start
```

Expected output:

```txt
Server running on port 3000
```

---

# Local API URL

```txt
http://localhost:3000
```

---

# API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| /api/token | POST | Generate access token |
| /api/upload | POST | Upload recording |
| /api/create-record | POST | Create metadata |
| /api/health | GET | Health check |

---

# Token API

## Endpoint

```txt
POST /api/token
```

---

## Content-Type

```txt
application/x-www-form-urlencoded
```

---

## Example Request Body

| KEY | VALUE |
|---|---|
| client_id | demo_client |
| client_secret | demo_secret |
| grant_type | client_credentials |

---

## Example Response

```json
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

# Upload API

## Endpoint

```txt
POST /api/upload
```

---

## Authorization

```txt
Bearer Token
```

---

## Content-Type

```txt
multipart/form-data
```

---

## Example Form Data

| KEY | TYPE | VALUE |
|---|---|---|
| file | File | recording.mp3 |

---

## Example Response

```json
{
  "success": true,
  "file_id": "REC001",
  "filename": "recording.mp3"
}
```

---

# Metadata API

## Endpoint

```txt
POST /api/create-record
```

---

## Authorization

```txt
Bearer Token
```

---

## Content-Type

```txt
application/json
```

---

## Example Request Body

```json
{
  "file_id": "REC001",
  "callId": "CALL12345",
  "localNumber": "+44123456789",
  "remoteNumber": "+44111222333",
  "startTime": "2026-05-15T10:00:00Z",
  "endTime": "2026-05-15T10:05:00Z"
}
```

---

## Example Response

```json
{
  "success": true,
  "message": "Record created successfully"
}
```

---

# Health API

## Endpoint

```txt
GET /api/health
```

---

## Example Response

```json
{
  "status": "running"
}
```

---

# Testing Using Postman

Download:

https://www.postman.com/downloads/

---

# Token Request

## Method

```txt
POST
```

## URL

```txt
http://localhost:3000/api/token
```

## Body

```txt
x-www-form-urlencoded
```

---

# Upload Request

## Method

```txt
POST
```

## URL

```txt
http://localhost:3000/api/upload
```

## Authorization

```txt
Bearer Token
```

## Body

```txt
form-data
```

Select MP3 file.

---

# Metadata Request

## Method

```txt
POST
```

## URL

```txt
http://localhost:3000/api/create-record
```

## Body

```txt
raw → JSON
```

---

# Step 11 — Create GitHub Repository

Create GitHub account:

https://github.com

Create repository:

```txt
external-recording-api
```

---

# Step 12 — Upload Project to GitHub

Initialize git:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit"
```

Connect repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/api-server.git
```

Push:

```bash
git branch -M main
git push -u origin main
```

---

# Step 13 — Deploy on Render

Create account:

https://render.com

---

# Create Web Service

Use:

| Setting | Value |
|---|---|
| Runtime | Node |
| Build Command | npm install |
| Start Command | npm start |

---

# Example Public URL

```txt
https://api-server.onrender.com
```

---

# Example Public APIs

```txt
https://api-server.onrender.com/api/token

https://api-server.onrender.com/api/upload

https://api-server.onrender.com/api/create-record
```

---

# Important Notes

## Free Render Limitation

Free services sleep after inactivity.

First request may take:

```txt
30-60 seconds
```

---

# Keep Server Awake

Use:

https://uptimerobot.com

Ping:

```txt
https://api-server.onrender.com/api/health
```

every 5 minutes.

---

# Production Recommendations

For production usage:

- Use HTTPS
- Store secrets in environment variables
- Use PostgreSQL/MySQL
- Add rate limiting
- Add logging
- Add validation
- Add admin dashboard
- Add monitoring

---

# File Storage

Uploaded recordings are stored inside:

```txt
uploads/
```

Metadata is stored inside:

```txt
database/records.json
```

---

# License

MIT License
