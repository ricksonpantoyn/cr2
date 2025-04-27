export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Missing "url" query parameter.');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml;q=0.9, */*;q=0.8'
      }
    });
    
    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching from URL:', error);
    res.status(500).send('Error fetching requested URL.');
  }
}
