import type { NextApiRequest, NextApiResponse } from 'next';

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    console.log('API route called with method:', req.method);
    console.log('Request body:', req.body);
    
    const applicationData: ApplicationData = req.body;
    
    // Validate the data
    const validation = validateApplication(applicationData);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
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
    
    console.log('Application validated and processed:', application);
    
    // Return success response (without email for now)
    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully!',
      applicationId: application.id,
      emailSent: false // Temporarily disabled
    });
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process application',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
