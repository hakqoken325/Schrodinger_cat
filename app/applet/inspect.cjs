const https = require('https');
const fs = require('fs');

https.get('https://build.flaps.lat/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('/app/applet/raw_flaps.html', data);
    console.log('Saved raw HTML, size:', data.length);
    
    // Find script tags
    const scriptMatches = data.match(/<script[\s\S]*?<\/script>/gi) || [];
    scriptMatches.forEach((s, idx) => {
      console.log(`Script ${idx} length: ${s.length}`);
      fs.writeFileSync(`/app/applet/script_${idx}.js`, s.replace(/<script[^>]*>/, '').replace(/<\/script>/, ''));
    });
  });
});
