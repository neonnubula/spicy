import express from 'express';
import cors from 'cors';
import { kv } from '@vercel/kv';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.post('/api/test', (req, res) => {
  console.log('Test API called');
  res.json({ message: 'API is working!' });
});

// Submit application endpoint
app.post('/api/submit-application', async (req, res) => {
  console.log('Submit application called with:', req.body);
  
  try {
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
    
    console.log('Application processed successfully:', { applicationId, email });
    
    // Store in Vercel KV
    try {
      // Store the application with its ID as the key
      await kv.set(`application:${applicationId}`, application);
      
      // Add to a list of all application IDs
      await kv.lpush('applications', applicationId);
      
      console.log('Application stored in KV successfully');
    } catch (kvError) {
      console.error('KV storage error:', kvError);
      // Continue even if KV fails - we still have the logs
    }
    
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
});

// Get applications endpoint
app.get('/api/applications', async (req, res) => {
  try {
    // Get all application IDs from the list
    const applicationIds = await kv.lrange('applications', 0, -1);
    
    // Fetch all applications
    const applications = [];
    for (const id of applicationIds) {
      const application = await kv.get(`application:${id}`);
      if (application) {
        applications.push(application);
      }
    }
    
    // Sort by timestamp (newest first)
    applications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    console.log('Retrieved applications:', applications.length);
    
    res.json({ 
      success: true, 
      count: applications.length,
      applications: applications
    });
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to retrieve applications',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/test');
  console.log('  POST /api/submit-application');
  console.log('  GET /api/applications');
});
