const { chromium } = require('playwright');

// Veterans Mental Health App E2E Tests
async function runVeteransAppE2ETests() {
  console.log('🚀 Starting Veterans Mental Health App E2E Tests...\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const baseURL = 'http://localhost:3000';
  let testResults = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Helper function to log test results
  const logTest = (testName, passed, error = null) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}: ${testName}`);
    if (error) console.log(`   Error: ${error}`);
    
    testResults.tests.push({ name: testName, passed, error });
    if (passed) testResults.passed++;
    else testResults.failed++;
  };

  try {
    // Test 1: Landing Page Load
    console.log('📝 Test 1: Landing Page Load');
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    const hasVeteranText = await page.locator('text=Canadian Veterans').isVisible();
    logTest('Landing page loads with correct title and content', 
           title.includes('Veterans') && hasVeteranText);

    // Test 2: Navigation Menu
    console.log('\n📝 Test 2: Navigation Menu');
    const navItems = [
      'Crisis Support',
      'Mental Health Assessment', 
      'Treatment Planning',
      'Progress Tracking'
    ];
    
    let navTestPassed = true;
    for (const item of navItems) {
      const exists = await page.locator(`text=${item}`).isVisible();
      if (!exists) navTestPassed = false;
    }
    logTest('Navigation menu contains all required items', navTestPassed);

    // Test 3: Demo Authentication
    console.log('\n📝 Test 3: Demo Authentication');
    await page.click('text=Sign In');
    await page.waitForLoadState('networkidle');
    
    // Fill demo credentials
    await page.fill('input[type="email"]', 'demo@veteran.ca');
    await page.fill('input[type="password"]', 'VeteranDemo2024!');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    
    const dashboardVisible = await page.locator('text=Mental Health Dashboard').isVisible();
    logTest('Demo authentication works and redirects to dashboard', dashboardVisible);

    // Test 4: Crisis Support Access
    console.log('\n📝 Test 4: Crisis Support Access');
    await page.click('text=Crisis Support');
    await page.waitForLoadState('networkidle');
    
    const crisisTitle = await page.locator('text=24/7 Crisis Support').isVisible();
    const vacCrisisLine = await page.locator('text=1-800-268-7708').isVisible();
    logTest('Crisis support page loads with VAC crisis line', crisisTitle && vacCrisisLine);

    // Test 5: Mental Health Assessment
    console.log('\n📝 Test 5: Mental Health Assessment');
    await page.click('text=Mental Health Assessment');
    await page.waitForLoadState('networkidle');
    
    const assessmentForm = await page.locator('form').isVisible();
    const ptsdQuestions = await page.locator('text=PTSD').isVisible();
    logTest('Mental health assessment form is accessible', assessmentForm && ptsdQuestions);

    // Test 6: Canadian Resources Integration
    console.log('\n📝 Test 6: Canadian Resources Integration');
    await page.click('text=Resources');
    await page.waitForLoadState('networkidle');
    
    const vacResources = await page.locator('text=Veterans Affairs Canada').isVisible();
    const ossissSupport = await page.locator('text=OSISS').isVisible();
    logTest('Canadian veteran resources are properly integrated', vacResources && ossissSupport);

    // Test 7: Security Features
    console.log('\n📝 Test 7: Security Features');
    const encryptionStatus = await page.locator('text=encrypted').isVisible();
    const hipaaCompliance = await page.locator('text=HIPAA').isVisible();
    logTest('Security and encryption indicators are present', encryptionStatus || hipaaCompliance);

    // Test 8: Provincial Crisis Lines
    console.log('\n📝 Test 8: Provincial Crisis Lines');
    await page.click('text=Crisis Support');
    await page.waitForLoadState('networkidle');
    
    const provincialSupport = await page.locator('text=Provincial').isVisible();
    const ontarioSupport = await page.locator('text=Ontario').isVisible();
    logTest('Provincial crisis lines are available', provincialSupport || ontarioSupport);

    // Test 9: Treatment Planning
    console.log('\n📝 Test 9: Treatment Planning');
    await page.click('text=Treatment Planning');
    await page.waitForLoadState('networkidle');
    
    const treatmentPlan = await page.locator('text=Treatment Plan').isVisible();
    const goalSetting = await page.locator('text=Goals').isVisible();
    logTest('Treatment planning features are functional', treatmentPlan && goalSetting);

    // Test 10: Progress Tracking
    console.log('\n📝 Test 10: Progress Tracking');
    await page.click('text=Progress Tracking');
    await page.waitForLoadState('networkidle');
    
    const progressCharts = await page.locator('canvas, svg').isVisible();
    const moodTracking = await page.locator('text=Mood').isVisible();
    logTest('Progress tracking with charts is available', progressCharts || moodTracking);

  } catch (error) {
    logTest('E2E Test Execution', false, error.message);
  } finally {
    await browser.close();
  }

  // Print Summary
  console.log('\n' + '='.repeat(60));
  console.log('🏥 VETERANS MENTAL HEALTH APP - E2E TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📊 Total: ${testResults.tests.length}`);
  console.log(`📈 Success Rate: ${Math.round((testResults.passed / testResults.tests.length) * 100)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.tests.filter(t => !t.passed).forEach(test => {
      console.log(`   - ${test.name}: ${test.error || 'Unknown error'}`);
    });
  }
  
  return testResults;
}

// Run the tests
if (require.main === module) {
  runVeteransAppE2ETests().catch(console.error);
}

module.exports = { runVeteransAppE2ETests };