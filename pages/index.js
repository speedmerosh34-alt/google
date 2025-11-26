export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Google Proxy</h1>
      <p>The page should load through the proxy below:</p>
      <iframe 
        src="/api/proxy" 
        style={{ width: '100%', height: '80vh', border: 'none' }}
      />
    </div>
  );
}
