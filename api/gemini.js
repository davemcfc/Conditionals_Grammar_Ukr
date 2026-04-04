export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Retrieve the secure key from Vercel's environment
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing from server environment' });
  }

  // We are upgrading you to the Gemini 3 Flash endpoint right here
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${apiKey}`;

  try {
    // Forward the exact payload sent from your React app to Google
    const googleResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!googleResponse.ok) {
      const errorText = await googleResponse.text();
      return res.status(googleResponse.status).json({ error: errorText });
    }

    const data = await googleResponse.json();
    
    // Send the safe response back to your React app
    return res.status(200).json(data);

  } catch (error) {
    console.error("Serverless Function Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
