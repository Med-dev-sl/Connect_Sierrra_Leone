require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/send-application', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'nationalId', maxCount: 1 },
  { name: 'votersId', maxCount: 1 },
  { name: 'transcript', maxCount: 1 },
]), async (req, res) => {
  try {
    const fields = req.body;
    const files = req.files || {};

    // Create transporter using SMTP env vars
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: (process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || 'mohamedsallu.sl@gmail.com';

    // Build email body
    const bodyLines = [];
    bodyLines.push(`Applicant: ${fields.firstName || ''} ${fields.middleName || ''} ${fields.lastName || ''}`);
    bodyLines.push(`Email: ${fields.email || ''}`);
    bodyLines.push(`Phone: ${fields.phone || ''}`);
    bodyLines.push(`Program: ${fields.program || ''}`);
    bodyLines.push(`Sponsor: ${fields.sponsor || ''}`);
    bodyLines.push(`Address: ${fields.address || ''}`);
    bodyLines.push(`Date of Birth: ${fields.dateOfBirth || ''}`);
    bodyLines.push(`Additional fields:`);
    Object.keys(fields).forEach(k => { if (!['firstName','middleName','lastName','email','phone','program','sponsor','address','dateOfBirth'].includes(k)) bodyLines.push(`${k}: ${fields[k]}`); });

    const attachments = [];
    if (files.pdf && files.pdf[0]) attachments.push({ filename: files.pdf[0].originalname || 'application.pdf', content: files.pdf[0].buffer });
    if (files.passport && files.passport[0]) attachments.push({ filename: files.passport[0].originalname || 'passport.jpg', content: files.passport[0].buffer });
    if (files.nationalId && files.nationalId[0]) attachments.push({ filename: files.nationalId[0].originalname || 'nationalId.pdf', content: files.nationalId[0].buffer });
    if (files.votersId && files.votersId[0]) attachments.push({ filename: files.votersId[0].originalname || 'votersId.pdf', content: files.votersId[0].buffer });
    if (files.transcript && files.transcript[0]) attachments.push({ filename: files.transcript[0].originalname || 'transcript.pdf', content: files.transcript[0].buffer });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: adminEmail,
      subject: `New Application - ${fields.firstName || ''} ${fields.lastName || ''}`,
      text: bodyLines.join('\n'),
      attachments,
    });

    // Send email to applicant if email provided
    if (fields.email) {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || process.env.SMTP_USER,
        to: fields.email,
        subject: 'Your Application — Connect Sierra Leone',
        text: 'Thank you for applying. Please find your application attached as a PDF and keep the receipt of payment as proof.',
        attachments,
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log('Application email server running on port', port));
