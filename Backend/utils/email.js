const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `Luxury Motors <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log('Email sending failed:', error.message);
    return false;
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to Luxury Motors!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering with Luxury Motors. We're excited to have you on board!</p>
        <p>Start exploring our collection of luxury vehicles today.</p>
        <a href="${process.env.FRONTEND_URL}/vehicles" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Browse Vehicles</a>
        <p style="margin-top: 20px;">Best regards,<br/>Luxury Motors Team</p>
      </div>
    `;
    await sendEmail({ email, subject: 'Welcome to Luxury Motors!', html });
    return true;
  } catch (error) {
    console.log('Welcome email sending failed:', error.message);
    return false;
  }
};

module.exports = { sendEmail, sendWelcomeEmail };