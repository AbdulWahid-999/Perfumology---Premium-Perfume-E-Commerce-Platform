const sendEmail = require('../utils/sendEmail');

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ea580c;">New Contact Message - Perfumology</h2>

        <div style="background-color: #fff7ed; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>

        <h3 style="color: #ea580c;">Message:</h3>
        <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #ea580c; border-radius: 5px;">
          <p style="white-space: pre-wrap;">${message}</p>
        </div>

        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This is an automated notification from Perfumology Contact Form.
        </p>
      </div>
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: emailHtml,
    });

    res.status(200).json({ message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};

module.exports = {
  sendContactMessage,
};
