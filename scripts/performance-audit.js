const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
  };

  const runnerResult = await lighthouse('http://localhost:3000', options);
  const report = JSON.parse(runnerResult.report);

  console.log('=== ScorpiusCore Performance Audit ===');
  console.log('Performance Score:', Math.round(report.categories.performance.score * 100));
  console.log('Accessibility Score:', Math.round(report.categories.accessibility.score * 100));
  console.log('Best Practices Score:', Math.round(report.categories['best-practices'].score * 100));
  console.log('SEO Score:', Math.round(report.categories.seo.score * 100));

  // Detailed metrics
  const metrics = report.audits.metrics.details.items[0];
  console.log('\n=== Core Web Vitals ===');
  console.log('First Contentful Paint:', metrics.firstContentfulPaint, 'ms');
  console.log('Largest Contentful Paint:', metrics.largestContentfulPaint, 'ms');
  console.log('Time to Interactive:', metrics.interactive, 'ms');
  console.log('Total Blocking Time:', metrics.totalBlockingTime, 'ms');
  console.log('Cumulative Layout Shift:', metrics.cumulativeLayoutShift);

  // Save report
  const reportPath = path.join(__dirname, '../performance-reports');
  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.writeFileSync(
    path.join(reportPath, `lighthouse-report-${timestamp}.json`),
    JSON.stringify(report, null, 2)
  );

  // Fail if performance is below 90
  if (report.categories.performance.score < 0.9) {
    console.error('\n❌ Performance score too low! Must be 90 or above.');
    process.exit(1);
  }

  console.log('\n✅ All performance metrics passed!');
  await chrome.kill();
}

runAudit().catch(console.error);
