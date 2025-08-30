import { createClient } from 'redis';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL
});

// Connect to Redis
redis.on('error', err => console.log('Redis Client Error', err));
await redis.connect();

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
    
    // Generate unique ID and timestamp
    const applicationId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const timestamp = new Date().toISOString();
    
    // Create application object
    const application = {
      id: applicationId,
      timestamp: timestamp,
      name: name,
      email: email,
      phone: phone,
      interest: interest,
      message: message
    };
    
    // Log the application for storage (you can access this in Vercel logs)
    console.log('=== NEW APPLICATION SUBMISSION ===');
    console.log('Application ID:', applicationId);
    console.log('Timestamp:', timestamp);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Interest:', interest);
    console.log('Message:', message);
    console.log('==================================');
    
    // Store in Redis
    try {
      // Store the application with its ID as the key
      await redis.set(`application:${applicationId}`, JSON.stringify(application));
      
      // Add to a list of all application IDs
      await redis.lPush('applications', applicationId);
      
      console.log('Application stored in Redis successfully');
    } catch (redisError) {
      console.error('Redis storage error:', redisError);
      // Continue even if Redis fails - we still have the logs
    }
    
    console.log('Application processed successfully:', { applicationId, email });
    
    res.json({ 
      success: true, 
      message: 'Application submitted successfully! We will review and get back to you within 2-3 business days.',
      applicationId,
      emailSent: false
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
