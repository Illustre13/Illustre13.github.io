import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate inputs
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'ndahayosibertin17@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #03a9f4; border-bottom: 2px solid #03a9f4; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #333;">From:</strong> 
              <span style="color: #666;">${firstName} ${lastName}</span>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #333;">Email:</strong> 
              <a href="mailto:${email}" style="color: #03a9f4; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
            <p>Sent from your portfolio contact form</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again.' 
    });
  }
}
