/**
 * Cloudflare Pages Function for handling contact form submissions
 * This replaces the Node.js server functionality
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Parse form data
    const formData = await request.formData();
    
    // Extract form fields
    const data = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      zipCode: formData.get('zipCode') || '',
      message: formData.get('message') || '',
      timestamp: new Date().toISOString()
    };
    
    // Validate required fields
    if (!data.email || !data.phone) {
      return new Response(JSON.stringify({ 
        error: 'Email and phone are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create SHA256 hash of email (for AudienceLab CDP)
    const encoder = new TextEncoder();
    const emailData = encoder.encode(data.email.toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', emailData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const emailHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Prepare webhook payload
    const webhookPayload = {
      ...data,
      emailHash,
      source: 'parcelvest-website',
      leadType: 'landowner'
    };
    
    // Forward to your webhook endpoint (replace with your actual webhook URL)
    const WEBHOOK_URL = env.WEBHOOK_URL || 'https://your-webhook-endpoint.com/webhook/audiencelab-cdp';
    
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'parcelvest-cloudflare-pages'
      },
      body: JSON.stringify(webhookPayload)
    });
    
    if (!webhookResponse.ok) {
      console.error('Webhook failed:', await webhookResponse.text());
      // Still return success to user even if webhook fails
    }
    
    // Return success response
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Thank you for your submission. We will contact you soon!'
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ 
      error: 'An error occurred processing your submission' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle preflight requests
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}