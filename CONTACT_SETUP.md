# Contact Form Email Setup

The contact form is ready, but you need to configure an email service to actually send emails.

## Option 1: Nodemailer with Gmail

1. Install nodemailer:
```bash
npm install nodemailer
```

2. Add to `.env.local`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

3. Update `/api/contact.ts`:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Inside the handler:
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'ndahayosibertin17@gmail.com',
  replyTo: email,
  subject: `Contact Form: ${firstName} ${lastName}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});
```

## Option 2: SendGrid

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Add to `.env.local`:
```env
SENDGRID_API_KEY=your-api-key
```

3. Update `/api/contact.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const msg = {
  to: 'ndahayosibertin17@gmail.com',
  from: 'verified-sender@yourdomain.com',
  replyTo: email,
  subject: `Contact Form: ${firstName} ${lastName}`,
  text: message,
  html: `<p>${message}</p>`,
};

await sgMail.send(msg);
```

## Option 3: Resend (Recommended for Next.js)

1. Install Resend:
```bash
npm install resend
```

2. Sign up at https://resend.com

3. Add to `.env.local`:
```env
RESEND_API_KEY=your-api-key
```

4. Update `/api/contact.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'contact@yourdomain.com',
  to: 'ndahayosibertin17@gmail.com',
  replyTo: email,
  subject: `Contact Form: ${firstName} ${lastName}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});
```

## Current Status

For now, the contact form will:
- ✅ Validate all inputs
- ✅ Show success/error messages
- ✅ Log submissions to console
- ❌ Not actually send emails (until you configure one of the above)

Choose the option that works best for you and update the API endpoint!
