export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // 1. We use the exact name shown in your debug log
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY?.replace(/['"]+/g, '').trim();
  
  if (!apiKey) {
    console.error("--- BACKEND ERROR: Key not found! Your debug log shows it as REACT_APP_GEMINI_API_KEY ---");
    return res.status(500).json({ error: 'API key is missing from the server.' });
  }

  // 2. Using the correct, modern 2.5 model for 2026
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const googleResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      console.error(`--- GOOGLE API ERROR (${googleResponse.status}): ${data.error?.message || "Unknown error"} ---`);
      return res.status(googleResponse.status).json({ error: data.error?.message || 'Check connection.' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("--- SERVERLESS FUNCTION CRASH ---", error);
    return res.status(500).json({ error: 'Internal Server Error.' });
  }
}