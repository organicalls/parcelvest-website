const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Webhook endpoint for form submissions
app.post('/webhook/audiencelab-cdp', async (req, res) => {
    console.log('New lead submission:', req.body);
    
    // Check honeypot field
    if (req.body.website) {
        console.log('Spam detected via honeypot');
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid submission' 
        });
    }
    
    // Extract lead data
    const leadData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        email_hash: req.body.email_hash,
        phone: req.body.phone,
        phone_hash: req.body.phone_hash,
        propertyAddress: req.body.propertyAddress,
        propertyZip: req.body.propertyZip,
        propertyDescription: req.body.propertyDescription,
        source: req.body.source || 'parcelvest_website',
        intent_score: req.body.intent_score || 'high',
        form_version: req.body.form_version || '2.0',
        timestamp: req.body.timestamp || new Date().toISOString(),
        ip_address: req.ip,
        user_agent: req.body.user_agent || req.headers['user-agent'],
        referrer: req.body.referrer || req.headers.referer
    };
    
    try {
        // In production, this would:
        // 1. Validate the data
        // 2. Score the lead using AI
        // 3. Save to Supabase
        // 4. Trigger AudienceLab sync
        // 5. Send notification emails
        
        // For now, just log and respond
        console.log('Lead data processed:', leadData);
        
        res.json({ 
            success: true, 
            message: 'Thank you for your submission. We will contact you within 48 hours.',
            lead_id: `PV-${Date.now()}`
        });
        
    } catch (error) {
        console.error('Error processing lead:', error);
        res.status(500).json({ 
            success: false, 
            message: 'There was an error processing your request. Please try again.' 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`ParcelVest website running on http://localhost:${PORT}`);
    console.log(`Webhook endpoint: http://localhost:${PORT}/webhook/audiencelab-cdp`);
});