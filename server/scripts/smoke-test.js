// Simple smoke test for Marketing Hero API
// Usage: node server/scripts/smoke-test.js --url=https://api-markethero.onrender.com

const arg = process.argv.find(a => a.startsWith('--url='));
const base = (arg ? arg.split('=')[1] : null) || process.env.BASE_URL || 'http://localhost:10000';

async function check(path) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(`[${res.status}] ${url} ->`, text.slice(0, 120));
    return res.ok;
  } catch (err) {
    console.error(`ERROR ${url}:`, err.message);
    return false;
  }
}

(async () => {
  console.log('Base URL:', base);
  const healthOk = await check('/api/health');
  const readyOk = await check('/api/ready');
  const ok = healthOk && readyOk;
  console.log('\nResult:', ok ? ' OK' : ' Failed');
  process.exit(ok ? 0 : 1);
})();
