const https = require('https');
const fs = require('fs');

https.get('https://build.flaps.lat/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('/tmp/raw_flaps.html', data);
    console.log('Saved raw HTML, size:', data.length);
    
    // Look for building catalog in data
    const matches = data.match(/name:\s*['"][^'"]+['"],\s*category/g) || 
                    data.match(/cost:\s*\d+/g) ||
                    data.match(/building/gi);
    console.log('Building keywords count:', matches ? matches.length : 0);

    // Find script 1, 2, 3, 4, 5, 6
    const scriptMatches = data.match(/<script[\s\S]*?<\/script>/gi) || [];
    scriptMatches.forEach((s, idx) => {
      console.log(`Script ${idx} length: ${s.length}`);
      fs.writeFileSync(`/tmp/script_${idx}.js`, s.replace(/<script[^>]*>/, '').replace(/<\/script>/, ''));
    });
  });
});
