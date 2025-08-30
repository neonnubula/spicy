import express from 'express';
import cors from 'cors';

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
app.post('/api/submit-application', (req, res) => {
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
    
    // Generate unique ID
    const applicationId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    console.log('Application processed successfully:', { applicationId, email });
    
    res.json({ 
      success: true, 
      message: 'Application submitted successfully!',
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

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/test');
  console.log('  POST /api/submit-application');
});
