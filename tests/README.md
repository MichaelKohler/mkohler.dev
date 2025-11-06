# Visual Regression Testing

This project uses Playwright for visual regression testing to ensure the homepage appearance remains consistent across changes.

## Setup

The visual regression tests are already configured and ready to use. The setup includes:

- **Playwright Test Framework**: Configured for both desktop and mobile viewports
- **Multiple Browsers**: Tests run on both Chromium and Firefox
- **Dev Server Integration**: Tests run against the live development server
- **Baseline Screenshots**: Stored in `tests/visual-regression.spec.js-snapshots/`
- **Test Configuration**: `playwright.config.js` with Chromium and Firefox projects

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Update baseline screenshots (when changes are intentional)
npm run test:update
```

## Test Coverage

The current setup tests:

- **Chromium Desktop** (1280x720): Homepage screenshot
- **Chromium Mobile** (iPhone 12 size): Homepage screenshot  
- **Firefox Desktop** (1280x720): Homepage screenshot
- **Firefox Mobile** (390x844): Homepage screenshot

## Workflow

1. **Start dev server**: Tests automatically start the development server (`npm start`)
2. **Take screenshots**: Full-page screenshots are captured across all browser/viewport combinations
3. **Compare**: New screenshots are compared against baseline images
4. **Report differences**: Any visual changes will cause test failures

## Updating Baselines

When you make intentional visual changes:

1. Review the test report to see visual differences
2. If changes are expected, run: `npm run test:update`
3. Commit the updated baseline screenshots

## Files

- `tests/visual-regression.spec.js` - Main test file
- `playwright.config.js` - Playwright configuration
- `tests/visual-regression.spec.js-snapshots/` - Baseline screenshots (tracked in git)
