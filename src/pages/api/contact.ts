import { NextApiRequest, NextApiResponse } from 'next';

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

    // TODO: Add your email service here (SendGrid, Nodemailer, etc.)
    // For now, just log the message
    console.log('Contact Form Submission:', {
      firstName,
      lastName,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate sending email
    // await sendEmail({
    //   to: 'ndahayosibertin17@gmail.com',
    //   from: email,
    //   subject: `Contact Form: ${firstName} ${lastName}`,
    //   text: message,
    // });

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
