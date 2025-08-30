import { kv } from '@vercel/kv';

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

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
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
}
