const rawKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
const apiKey = rawKey?.replace(/['"]+/g, '').trim();
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
