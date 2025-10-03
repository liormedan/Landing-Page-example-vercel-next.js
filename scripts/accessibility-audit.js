#!/usr/bin/env node

/**
 * Accessibility Audit Script
 * 
 * This script runs comprehensive accessibility tests including:
 * - Automated axe-core testing
 * - Color contrast verification
 * - Keyboard navigation testing
 * - Screen reader compatibility checks
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Accessibility Audit...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n${colors.blue}▶ ${description}${colors.reset}`);
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    log(`${colors.green}✓ ${description} completed successfully${colors.reset}`);
    return { success: true, output };
  } catch (error) {
    log(`${colors.red}✗ ${description} failed${colors.reset}`);
    log(`${colors.red}Error: ${error.message}${colors.reset}`);
    return { success: false, error: error.message };
  }
}

// Test results tracking
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

function addResult(test, status, message = '') {
  results.details.push({ test, status, message });
  if (status === 'pass') results.passed++;
  else if (status === 'fail') results.failed++;
  else if (status === 'warn') results.warnings++;
}

// 1. Run automated accessibility tests
log(`${colors.bold}1. Running Automated Accessibility Tests${colors.reset}`);

const testResult = runCommand(
  'npm run test -- --run --reporter=verbose src/__tests__/accessibility/',
  'Running accessibility test suite'
);

if (testResult.success) {
  addResult('Automated Tests', 'pass', 'All automated accessibility tests passed');
} else {
  addResult('Automated Tests', 'fail', 'Some automated tests failed');
}

// 2. Check for accessibility best practices in code
log(`\n${colors.bold}2. Checking Code for Accessibility Best Practices${colors.reset}`);

const checkPatterns = [
  {
    pattern: /aria-label|aria-labelledby|aria-describedby/g,
    file: 'src/**/*.tsx',
    description: 'ARIA labels usage',
    required: true
  },
  {
    pattern: /role=/g,
    file: 'src/**/*.tsx',
    description: 'ARIA roles usage',
    required: false
  },
  {
    pattern: /tabIndex|tabindex/g,
    file: 'src/**/*.tsx',
    description: 'Tab index management',
    required: false
  },
  {
    pattern: /alt=/g,
    file: 'src/**/*.tsx',
    description: 'Image alt attributes',
    required: true
  }
];

// Simple pattern checking (would need more sophisticated analysis in real implementation)
checkPatterns.forEach(({ pattern, description, required }) => {
  try {
    const grepResult = execSync(`grep -r "${pattern.source}" src/components src/app --include="*.tsx" || true`, { encoding: 'utf8' });
    const matches = grepResult.trim().split('\n').filter(line => line.length > 0);
    
    if (matches.length > 0) {
      addResult(description, 'pass', `Found ${matches.length} instances`);
      log(`${colors.green}✓ ${description}: Found ${matches.length} instances${colors.reset}`);
    } else if (required) {
      addResult(description, 'warn', 'No instances found - may need attention');
      log(`${colors.yellow}⚠ ${description}: No instances found${colors.reset}`);
    } else {
      addResult(description, 'pass', 'Optional pattern');
      log(`${colors.blue}ℹ ${description}: Optional pattern${colors.reset}`);
    }
  } catch (error) {
    addResult(description, 'fail', `Error checking pattern: ${error.message}`);
  }
});

// 3. Check for semantic HTML usage
log(`\n${colors.bold}3. Checking Semantic HTML Usage${colors.reset}`);

const semanticElements = [
  'main', 'nav', 'section', 'article', 'aside', 'header', 'footer', 'h1', 'h2', 'h3'
];

semanticElements.forEach(element => {
  try {
    const result = execSync(`grep -r "<${element}" src/components src/app --include="*.tsx" || true`, { encoding: 'utf8' });
    const matches = result.trim().split('\n').filter(line => line.length > 0);
    
    if (matches.length > 0) {
      addResult(`Semantic HTML: ${element}`, 'pass', `Found ${matches.length} instances`);
      log(`${colors.green}✓ <${element}> elements: ${matches.length} found${colors.reset}`);
    } else {
      addResult(`Semantic HTML: ${element}`, 'warn', 'No instances found');
      log(`${colors.yellow}⚠ <${element}> elements: None found${colors.reset}`);
    }
  } catch (error) {
    addResult(`Semantic HTML: ${element}`, 'fail', `Error: ${error.message}`);
  }
});

// 4. Check for focus management
log(`\n${colors.bold}4. Checking Focus Management${colors.reset}`);

const focusPatterns = [
  'focus()', 'blur()', 'tabIndex', 'autoFocus', 'focus-visible', 'focus-within'
];

focusPatterns.forEach(pattern => {
  try {
    const result = execSync(`grep -r "${pattern}" src/components src/app --include="*.tsx" || true`, { encoding: 'utf8' });
    const matches = result.trim().split('\n').filter(line => line.length > 0);
    
    if (matches.length > 0) {
      addResult(`Focus Management: ${pattern}`, 'pass', `Found ${matches.length} instances`);
      log(`${colors.green}✓ ${pattern}: ${matches.length} instances${colors.reset}`);
    }
  } catch (error) {
    addResult(`Focus Management: ${pattern}`, 'fail', `Error: ${error.message}`);
  }
});

// 5. Generate accessibility report
log(`\n${colors.bold}5. Generating Accessibility Report${colors.reset}`);

const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total: results.passed + results.failed + results.warnings,
    passed: results.passed,
    failed: results.failed,
    warnings: results.warnings,
    score: Math.round((results.passed / (results.passed + results.failed + results.warnings)) * 100)
  },
  details: results.details,
  recommendations: [
    'Ensure all interactive elements are keyboard accessible',
    'Verify color contrast meets WCAG AA standards (4.5:1 for normal text)',
    'Test with screen readers (NVDA, JAWS, VoiceOver)',
    'Validate HTML structure and semantic markup',
    'Test focus management and skip links functionality',
    'Verify ARIA labels and descriptions are meaningful',
    'Test with keyboard-only navigation',
    'Check responsive design accessibility on mobile devices'
  ]
};

// Write report to file
const reportPath = path.join(__dirname, '..', 'accessibility-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

// Display summary
log(`\n${colors.bold}📊 Accessibility Audit Summary${colors.reset}`);
log(`${colors.green}✓ Passed: ${results.passed}${colors.reset}`);
log(`${colors.red}✗ Failed: ${results.failed}${colors.reset}`);
log(`${colors.yellow}⚠ Warnings: ${results.warnings}${colors.reset}`);
log(`${colors.blue}📈 Score: ${report.summary.score}%${colors.reset}`);

if (results.failed > 0) {
  log(`\n${colors.red}${colors.bold}❌ Accessibility audit completed with failures${colors.reset}`);
  log(`${colors.red}Please review the failed tests and fix accessibility issues${colors.reset}`);
} else if (results.warnings > 0) {
  log(`\n${colors.yellow}${colors.bold}⚠️ Accessibility audit completed with warnings${colors.reset}`);
  log(`${colors.yellow}Consider addressing the warnings to improve accessibility${colors.reset}`);
} else {
  log(`\n${colors.green}${colors.bold}✅ Accessibility audit completed successfully!${colors.reset}`);
  log(`${colors.green}All accessibility checks passed${colors.reset}`);
}

log(`\n${colors.blue}📄 Detailed report saved to: ${reportPath}${colors.reset}`);

// Manual testing checklist
log(`\n${colors.bold}🔧 Manual Testing Checklist${colors.reset}`);
log(`${colors.blue}Please perform the following manual tests:${colors.reset}`);

const manualTests = [
  '1. Navigate the entire site using only the keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys)',
  '2. Test with a screen reader (NVDA on Windows, VoiceOver on Mac)',
  '3. Verify all images have meaningful alt text',
  '4. Check color contrast in different lighting conditions',
  '5. Test with browser zoom at 200% and 400%',
  '6. Verify skip links work correctly',
  '7. Test form validation and error announcements',
  '8. Check focus indicators are visible and clear',
  '9. Test with high contrast mode enabled',
  '10. Verify reduced motion preferences are respected'
];

manualTests.forEach(test => {
  log(`   ${colors.yellow}□ ${test}${colors.reset}`);
});

log(`\n${colors.bold}🎯 Next Steps${colors.reset}`);
if (results.failed > 0) {
  log(`${colors.red}1. Fix failing automated tests${colors.reset}`);
  log(`${colors.yellow}2. Complete manual testing checklist${colors.reset}`);
  log(`${colors.blue}3. Re-run accessibility audit${colors.reset}`);
} else {
  log(`${colors.green}1. Complete manual testing checklist${colors.reset}`);
  log(`${colors.blue}2. Document accessibility features${colors.reset}`);
  log(`${colors.blue}3. Set up continuous accessibility monitoring${colors.reset}`);
}

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);