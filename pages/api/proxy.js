export default async function handler(req, res) {
  try {
    const url = new URL('https://www.google.com' + (req.url.replace('/api/proxy', '') || '/'));
    
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        ...req.headers,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        host: 'www.google.com',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    
    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
