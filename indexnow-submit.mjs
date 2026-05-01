/**
 * IndexNow URL Submission Script
 * ──────────────────────────────
 * Submits all site URLs to search engines via the IndexNow protocol.
 * 
 * Usage:
 *   node indexnow-submit.mjs           → Submit all URLs from sitemap
 *   node indexnow-submit.mjs --dry-run → Preview URLs without submitting
 *   node indexnow-submit.mjs --url https://oumarousanda.com/blog/my-article → Submit a single URL
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// ── Configuration ────────────────────────────────────────────────
const CONFIG = {
  host: 'oumarousanda.com',
  key: '295294ffcb5a4e808e8c7bd081996a83',
  keyLocation: 'https://oumarousanda.com/295294ffcb5a4e808e8c7bd081996a83.txt',
  searchEngine: 'api.indexnow.org', // Shared endpoint (Bing, Yandex, etc.)
};

// ── Parse CLI arguments ──────────────────────────────────────────
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const singleUrlIndex = args.indexOf('--url');
const singleUrl = singleUrlIndex !== -1 ? args[singleUrlIndex + 1] : null;

// ── Extract URLs from sitemap.xml ────────────────────────────────
function getUrlsFromSitemap() {
  const sitemapPath = resolve('public', 'sitemap.xml');
  const sitemap = readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;

  while ((match = locRegex.exec(sitemap)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

// ── Submit URLs to IndexNow ──────────────────────────────────────
async function submitUrls(urls) {
  const payload = {
    host: CONFIG.host,
    key: CONFIG.key,
    keyLocation: CONFIG.keyLocation,
    urlList: urls,
  };

  console.log('\n📡 IndexNow — Submitting URLs to search engines...');
  console.log(`   Engine:   ${CONFIG.searchEngine}`);
  console.log(`   Host:     ${CONFIG.host}`);
  console.log(`   URLs:     ${urls.length}`);
  console.log('');

  if (isDryRun) {
    console.log('🔍 Dry run — URLs that would be submitted:\n');
    urls.forEach((url, i) => console.log(`   ${i + 1}. ${url}`));
    console.log('\n✅ Dry run complete. No URLs were submitted.');
    return;
  }

  try {
    const response = await fetch(`https://${CONFIG.searchEngine}/IndexNow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const statusText = response.statusText;

    console.log(`   Response: ${status} ${statusText}`);

    switch (status) {
      case 200:
        console.log('✅ All URLs submitted successfully!');
        break;
      case 202:
        console.log('✅ URLs accepted for processing.');
        break;
      case 400:
        console.error('❌ Bad request — Invalid format.');
        break;
      case 403:
        console.error('❌ Forbidden — API key not valid or key file not found.');
        break;
      case 422:
        console.error('❌ Unprocessable Entity — URLs don\'t belong to the host or key mismatch.');
        break;
      case 429:
        console.error('⚠️  Too Many Requests — Try again later.');
        break;
      default:
        console.log(`ℹ️  Unexpected response: ${status}`);
    }

    // Log response body if available
    try {
      const body = await response.text();
      if (body) console.log(`   Body: ${body}`);
    } catch (_) { /* no body */ }

  } catch (error) {
    console.error('❌ Network error:', error.message);
    process.exit(1);
  }
}

// ── Main ─────────────────────────────────────────────────────────
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  IndexNow URL Submission — oumarousanda.com');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let urls;

  if (singleUrl) {
    urls = [singleUrl];
    console.log(`\n🎯 Single URL mode: ${singleUrl}`);
  } else {
    urls = getUrlsFromSitemap();
    console.log(`\n📄 Found ${urls.length} URLs in sitemap.xml`);
  }

  if (urls.length === 0) {
    console.error('❌ No URLs found to submit.');
    process.exit(1);
  }

  await submitUrls(urls);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  💡 Verify at: https://www.bing.com/webmasters');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main();
