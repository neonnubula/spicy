import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendConfirmationEmail = async (data) => {
  try {
    // Only send emails if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured, skipping email send');
      console.log('Would send confirmation email to:', data.email);
      return true; // Return true so the application still processes
    }

    const interestText = data.interest === 'free-testing' 
      ? 'Free Testing Access Only' 
      : 'Free Testing Access or Paid Full Access';

    console.log('Attempting to send email to:', data.email);
    console.log('Using API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');

    const emailResult = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Use Resend's default verified domain
      to: [data.email],
      subject: 'Hackademia - Application Received ✅',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2dd4ff, #8b5cf6, #4c1d95, #ff36a3); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Hackademia!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${data.name}</strong>,</p>
              
              <p>Thank you for your interest in Hackademia! We've successfully received your application for early access testing.</p>
              
              <div class="highlight">
                <h3>Your Application Details:</h3>
                <ul>
                  <li><strong>Interest Level:</strong> ${interestText}</li>
                  <li><strong>Testing Focus:</strong> ${data.message}</li>
                  <li><strong>Contact:</strong> ${data.email}</li>
                </ul>
              </div>
              
              <p>Our team will review your application and get back to you within 2-3 business days. We're excited to potentially have you as part of our testing community!</p>
              
              <p>In the meantime, feel free to explore our website and learn more about how Hackademia can help you excel academically while maintaining integrity.</p>
              
              <p>Questions? Simply reply to this email and we'll get back to you quickly.</p>
              
              <p>Best regards,<br>
              <strong>The Hackademia Team</strong></p>
            </div>
            
            <div class="footer">
              <p>This email was sent because you applied for early access at hackademia.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Email API response:', JSON.stringify(emailResult, null, 2));
    console.log('Email sent successfully:', emailResult.data?.id);
    return true;
    
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return false;
  }
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    console.log('API route called with method:', req.method);
    console.log('Request body:', req.body);
    
    const { name, email, phone, interest, message } = req.body;
    
    // Basic validation
    if (!name || !email || !phone || !interest || !message) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: ['All fields are required'] 
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: ['Invalid email format'] 
      });
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 7 || cleanPhone.length > 15) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: ['Invalid phone number format'] 
      });
    }
    
    // Generate unique ID
    const applicationId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    console.log('Application processed successfully:', { applicationId, email });
    
    // Send confirmation email
    const emailSent = await sendConfirmationEmail({ name, email, interest, message });
    
    if (!emailSent) {
      console.warn('Failed to send confirmation email for application:', applicationId);
    }
    
    res.json({ 
      success: true, 
      message: 'Application submitted successfully!',
      applicationId,
      emailSent
    });
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process application',
      details: error.message
    });
  }
}
