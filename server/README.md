# Application Email Server

This small Express server accepts the generated application PDF and attachments and emails them to the admin and the applicant.

Setup

1. Install dependencies in the `server` folder:

```bash
cd server
npm install
```

2. Copy and edit `.env.example` to `.env` and set SMTP credentials and admin email.

3. Start the server:

```bash
node index.js
```

This server exposes `POST /api/send-application` which accepts multipart/form-data with `pdf` and optional files `passport`, `nationalId`, `votersId`, `transcript` and other string fields.

The frontend will POST to `http://localhost:4001/api/send-application` by default. If you run the server elsewhere, ensure the frontend `fetch('/api/send-application')` points to the correct URL or configure a proxy for dev.
