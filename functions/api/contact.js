export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    // Forward to webhook
    const webhookResponse = await fetch(env.WEBHOOK_URL || 'https://your-webhook-endpoint.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: 'parcelvest-contact-form',
        timestamp: new Date().toISOString()
      })
    });
    
    if (webhookResponse.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error('Webhook request failed');
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}