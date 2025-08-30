import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

// Initialize Resend (API key from environment variables)
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation functions (server-side)
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 7 && cleanPhone.length <= 15;
};

const validateApplication = (data: ApplicationData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  } else if (!validatePhone(data.phone)) {
    errors.push('Invalid phone number format');
  }
  
  if (!data.interest) {
    errors.push('Interest level is required');
  }
  
  if (!data.message?.trim()) {
    errors.push('Message is required');
  }
  
  return { isValid: errors.length === 0, errors };
};

// Simple in-memory storage for now (will replace with database later)
const applications: (ApplicationData & { id: string; timestamp: string })[] = [];

const sendConfirmationEmail = async (data: ApplicationData): Promise<boolean> => {
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

    const emailResult = await resend.emails.send({
      from: 'Hackademia <noreply@hackademia.com>',
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

    console.log('Email sent successfully:', emailResult.data?.id);
    return true;
    
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const applicationData: ApplicationData = req.body;
    
    // Validate the data
    const validation = validateApplication(applicationData);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }
    
    // Generate unique ID and timestamp
    const application = {
      ...applicationData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    
    // Store the application (in-memory for now)
    applications.push(application);
    console.log(`New application stored: ${application.id} from ${application.email}`);
    
    // Send confirmation email
    const emailSent = await sendConfirmationEmail(applicationData);
    
    if (!emailSent) {
      console.warn('Failed to send confirmation email for application:', application.id);
    }
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully',
      applicationId: application.id,
      emailSent 
    });
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process application' 
    });
  }
}
