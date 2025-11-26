export default async function handler(req, res) {
  try {
    const pathQuery = req.url.split('/api/proxy')[1] || '/';
    const targetUrl = `https://www.google.com${pathQuery}`;

    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: body,
      redirect: 'follow',
    });

    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/html');
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.status(response.status).send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
