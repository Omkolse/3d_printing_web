const nodemailer = require('nodemailer');

const smtpHost = process.env.SMTP_HOST;
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

let transporter = null;
if (smtpHost && smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
} else {
  console.warn('SMTP not configured; emails will be skipped.');
}

async function sendEmail(to, subject, text, html) {
  if (!transporter) {
    console.log(`[email] skipped (no transporter): to=${to}, subject=${subject}`);
    return false;
  }
  try {
    const info = await transporter.sendMail({
      from: smtpUser,
      to,
      subject,
      text,
      html
    });
    console.log('Email sent:', info.messageId);
    return true;
  } catch (err) {
    console.error('Email send error:', err);
    return false;
  }
}

module.exports = { sendEmail };
