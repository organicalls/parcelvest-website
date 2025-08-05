const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission (placeholder endpoint)
app.post('/api/lead', (req, res) => {
    console.log('New lead submission:', req.body);
    
    // In production, this would:
    // 1. Validate the data
    // 2. Save to database
    // 3. Send email notifications
    // 4. Integrate with CRM/lead scoring system
    
    res.json({ 
        success: true, 
        message: 'Thank you for your submission. We will contact you within 48 hours.' 
    });
});

app.listen(PORT, () => {
    console.log(`ParcelVest website running on http://localhost:${PORT}`);
});