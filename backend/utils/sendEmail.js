import nodemailer from 'nodemailer';
import dns from 'dns';

// FIX FOR RAILWAY IPv6 ERROR (ENETUNREACH):
// Railway servers struggle with outgoing IPv6 connections to Gmail.
// This single line forces Node.js to use IPv4 (like 142.250.xxx.xxx) instead of IPv6.
dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Sometimes cloud servers like Railway have issues with DNS/TLS resolving, this helps:
  tls: {
    rejectUnauthorized: false
  }
});

export const sendContactEmail = async (name, email, service, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Project Enquiry: ${name} - Veltex Studio`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 600px; margin: 20px auto; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #0f172a; font-size: 24px; margin: 0; letter-spacing: -0.5px;">New Website Enquiry</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 5px; text-transform: uppercase; letter-spacing: 2px;">Veltex Studio</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 16px; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 16px;">
              <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 16px;">
              <span style="background-color: #f8fafc; padding: 4px 10px; border-radius: 4px; font-size: 14px;">${service || 'Not specified'}</span>
            </td>
          </tr>
        </table>

        <div style="margin-top: 30px;">
          <h3 style="color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Message Details</h3>
          <p style="background: #f8fafc; padding: 20px; border-left: 4px solid #0f172a; border-radius: 4px; color: #334155; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">This is an automated email generated securely from the Veltex v5 website backend.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Premium Email notification sent successfully.');
    return { success: true };
  } catch (error) {
    console.error('Email Notification Error:', error.message);
    return { success: false, errorMsg: error.message };
  }
};
