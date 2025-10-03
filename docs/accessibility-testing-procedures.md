# Accessibility Testing Procedures

This document outlines comprehensive manual testing procedures to ensure WCAG 2.1 AA compliance for the landing page service.

## Table of Contents

1. [Keyboard Navigation Testing](#keyboard-navigation-testing)
2. [Screen Reader Testing](#screen-reader-testing)
3. [Color Contrast Testing](#color-contrast-testing)
4. [Focus Management Testing](#focus-management-testing)
5. [Form Accessibility Testing](#form-accessibility-testing)
6. [Mobile Accessibility Testing](#mobile-accessibility-testing)
7. [Browser Compatibility Testing](#browser-compatibility-testing)
8. [Automated Testing](#automated-testing)

## Keyboard Navigation Testing

### Prerequisites
- Close or disable mouse/trackpad
- Use only keyboard for navigation

### Test Procedures

#### 1. Tab Navigation
- [ ] **Test**: Press Tab to navigate through all interactive elements
- [ ] **Expected**: Focus moves logically through the page (top to bottom, left to right)
- [ ] **Expected**: All interactive elements receive focus (buttons, links, form fields)
- [ ] **Expected**: Focus indicators are clearly visible
- [ ] **Expected**: No elements are skipped or unreachable

#### 2. Reverse Tab Navigation
- [ ] **Test**: Press Shift+Tab to navigate backwards
- [ ] **Expected**: Focus moves in reverse order
- [ ] **Expected**: All elements remain accessible

#### 3. Skip Links
- [ ] **Test**: Press Tab on page load
- [ ] **Expected**: Skip links appear and are focusable
- [ ] **Test**: Press Enter on "Skip to main content"
- [ ] **Expected**: Focus moves to main content area
- [ ] **Test**: Press Enter on "Skip to navigation"
- [ ] **Expected**: Focus moves to navigation menu

#### 4. Button Activation
- [ ] **Test**: Focus on buttons and press Enter
- [ ] **Expected**: Buttons activate correctly
- [ ] **Test**: Focus on buttons and press Space
- [ ] **Expected**: Buttons activate correctly

#### 5. Link Navigation
- [ ] **Test**: Focus on links and press Enter
- [ ] **Expected**: Links navigate or scroll to target sections
- [ ] **Expected**: Smooth scrolling works correctly

#### 6. Form Navigation
- [ ] **Test**: Tab through form fields
- [ ] **Expected**: Focus moves logically through form
- [ ] **Test**: Use arrow keys in select dropdowns
- [ ] **Expected**: Options can be selected with arrow keys
- [ ] **Test**: Press Escape in dropdowns
- [ ] **Expected**: Dropdown closes and focus returns to trigger

#### 7. Mobile Menu (Mobile View)
- [ ] **Test**: Focus on hamburger menu button
- [ ] **Test**: Press Enter to open menu
- [ ] **Expected**: Menu opens and focus moves to first menu item
- [ ] **Test**: Press Escape
- [ ] **Expected**: Menu closes and focus returns to menu button
- [ ] **Test**: Tab through menu items
- [ ] **Expected**: Focus stays within menu when open

## Screen Reader Testing

### Prerequisites
- Install screen reader software:
  - **Windows**: NVDA (free) or JAWS
  - **Mac**: VoiceOver (built-in)
  - **Linux**: Orca

### Test Procedures

#### 1. Page Structure Navigation
- [ ] **Test**: Use heading navigation (H key in NVDA/JAWS)
- [ ] **Expected**: All headings are announced with correct levels
- [ ] **Expected**: Heading hierarchy is logical (H1 → H2 → H3, no skipped levels)

#### 2. Landmark Navigation
- [ ] **Test**: Use landmark navigation (D key in NVDA/JAWS)
- [ ] **Expected**: Main, navigation, and other landmarks are identified
- [ ] **Expected**: Landmarks have meaningful names

#### 3. Link Navigation
- [ ] **Test**: Use link navigation (K key in NVDA/JAWS)
- [ ] **Expected**: All links are announced with descriptive text
- [ ] **Expected**: Link purposes are clear from context

#### 4. Form Navigation
- [ ] **Test**: Navigate through form fields (F key in NVDA/JAWS)
- [ ] **Expected**: Field labels are announced clearly
- [ ] **Expected**: Required fields are identified
- [ ] **Expected**: Field types are announced (email, text, etc.)
- [ ] **Expected**: Error messages are announced immediately
- [ ] **Expected**: Helper text is read when field receives focus

#### 5. Button Navigation
- [ ] **Test**: Navigate through buttons (B key in NVDA/JAWS)
- [ ] **Expected**: Button purposes are clear
- [ ] **Expected**: Button states (pressed, expanded) are announced

#### 6. List Navigation
- [ ] **Test**: Navigate through lists (L key in NVDA/JAWS)
- [ ] **Expected**: List structure is announced (e.g., "List with 3 items")
- [ ] **Expected**: List items are clearly identified

#### 7. Image Navigation
- [ ] **Test**: Navigate through images (G key in NVDA/JAWS)
- [ ] **Expected**: All images have meaningful alt text
- [ ] **Expected**: Decorative images are ignored by screen reader

#### 8. Live Region Testing
- [ ] **Test**: Submit contact form with errors
- [ ] **Expected**: Error messages are announced automatically
- [ ] **Test**: Submit form successfully
- [ ] **Expected**: Success message is announced

## Color Contrast Testing

### Tools Required
- Color contrast analyzer (e.g., WebAIM Contrast Checker)
- Browser developer tools
- Physical testing in different lighting conditions

### Test Procedures

#### 1. Text Contrast
- [ ] **Test**: Body text on background
- [ ] **Expected**: Minimum 4.5:1 contrast ratio
- [ ] **Test**: Large text (18pt+ or 14pt+ bold) on background
- [ ] **Expected**: Minimum 3:1 contrast ratio

#### 2. Interactive Element Contrast
- [ ] **Test**: Button text on button background
- [ ] **Expected**: Minimum 4.5:1 contrast ratio
- [ ] **Test**: Link text on page background
- [ ] **Expected**: Minimum 4.5:1 contrast ratio

#### 3. Focus Indicator Contrast
- [ ] **Test**: Focus ring color against background
- [ ] **Expected**: Minimum 3:1 contrast ratio with adjacent colors
- [ ] **Test**: Focus indicators on different colored backgrounds
- [ ] **Expected**: Always visible and sufficient contrast

#### 4. Error State Contrast
- [ ] **Test**: Error text color on background
- [ ] **Expected**: Minimum 4.5:1 contrast ratio
- [ ] **Test**: Error border/background colors
- [ ] **Expected**: Sufficient contrast to indicate error state

#### 5. High Contrast Mode Testing
- [ ] **Test**: Enable Windows High Contrast mode
- [ ] **Expected**: All content remains visible and usable
- [ ] **Test**: Enable browser high contrast extensions
- [ ] **Expected**: Site adapts appropriately

## Focus Management Testing

### Test Procedures

#### 1. Focus Visibility
- [ ] **Test**: Tab through all interactive elements
- [ ] **Expected**: Focus indicators are clearly visible
- [ ] **Expected**: Focus indicators have sufficient size and contrast
- [ ] **Expected**: Focus indicators don't obscure content

#### 2. Focus Order
- [ ] **Test**: Tab through page in reading order
- [ ] **Expected**: Focus follows logical sequence
- [ ] **Expected**: No focus traps (except intentional ones like modals)

#### 3. Modal Focus Management
- [ ] **Test**: Open modal/popup (if any)
- [ ] **Expected**: Focus moves to modal
- [ ] **Expected**: Focus is trapped within modal
- [ ] **Test**: Close modal with Escape
- [ ] **Expected**: Focus returns to trigger element

#### 4. Dynamic Content Focus
- [ ] **Test**: Interact with elements that show/hide content
- [ ] **Expected**: Focus is managed appropriately
- [ ] **Expected**: Hidden content is not focusable

## Form Accessibility Testing

### Test Procedures

#### 1. Label Association
- [ ] **Test**: Click on form labels
- [ ] **Expected**: Associated input receives focus
- [ ] **Test**: Use screen reader to navigate form
- [ ] **Expected**: Labels are announced with inputs

#### 2. Required Field Indication
- [ ] **Test**: Identify required fields visually
- [ ] **Expected**: Required fields are clearly marked (*, "required", etc.)
- [ ] **Test**: Use screen reader on required fields
- [ ] **Expected**: Required status is announced

#### 3. Error Handling
- [ ] **Test**: Submit form with invalid data
- [ ] **Expected**: Error messages appear near relevant fields
- [ ] **Expected**: Error messages are descriptive and helpful
- [ ] **Test**: Use screen reader after form submission
- [ ] **Expected**: Errors are announced automatically
- [ ] **Test**: Fix errors and resubmit
- [ ] **Expected**: Success message is announced

#### 4. Field Instructions
- [ ] **Test**: Focus on fields with helper text
- [ ] **Expected**: Instructions are read by screen reader
- [ ] **Expected**: Instructions are visually associated with fields

#### 5. Keyboard Form Navigation
- [ ] **Test**: Navigate form using only keyboard
- [ ] **Expected**: All form controls are accessible
- [ ] **Expected**: Tab order is logical
- [ ] **Test**: Use Enter to submit form
- [ ] **Expected**: Form submits correctly

## Mobile Accessibility Testing

### Test Procedures

#### 1. Touch Target Size
- [ ] **Test**: Tap all interactive elements on mobile
- [ ] **Expected**: All targets are at least 44x44 pixels
- [ ] **Expected**: Adequate spacing between touch targets

#### 2. Mobile Screen Reader
- [ ] **Test**: Use VoiceOver (iOS) or TalkBack (Android)
- [ ] **Expected**: All content is accessible via gestures
- [ ] **Expected**: Swipe navigation works correctly

#### 3. Zoom and Reflow
- [ ] **Test**: Zoom to 200% on mobile
- [ ] **Expected**: Content reflows appropriately
- [ ] **Expected**: No horizontal scrolling required
- [ ] **Test**: Zoom to 400%
- [ ] **Expected**: Content remains usable

#### 4. Orientation Changes
- [ ] **Test**: Rotate device between portrait and landscape
- [ ] **Expected**: Content adapts appropriately
- [ ] **Expected**: No content is lost or becomes inaccessible

## Browser Compatibility Testing

### Browsers to Test
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Test Procedures

#### 1. Keyboard Navigation
- [ ] **Test**: Tab navigation in each browser
- [ ] **Expected**: Consistent behavior across browsers
- [ ] **Expected**: Focus indicators work in all browsers

#### 2. Screen Reader Compatibility
- [ ] **Test**: NVDA with Firefox and Chrome
- [ ] **Test**: JAWS with Chrome and Edge
- [ ] **Test**: VoiceOver with Safari
- [ ] **Expected**: Consistent announcements across combinations

#### 3. CSS Support
- [ ] **Test**: Focus-visible pseudo-class support
- [ ] **Expected**: Focus indicators work correctly
- [ ] **Test**: High contrast media queries
- [ ] **Expected**: Styles adapt appropriately

## Automated Testing

### Tools
- axe-core (integrated in tests)
- Lighthouse accessibility audit
- WAVE browser extension

### Test Procedures

#### 1. Run Automated Test Suite
```bash
npm run test -- --run src/__tests__/accessibility/
```

#### 2. Run Accessibility Audit Script
```bash
node scripts/accessibility-audit.js
```

#### 3. Lighthouse Audit
- [ ] **Test**: Run Lighthouse accessibility audit
- [ ] **Expected**: Score of 95+ (aim for 100)
- [ ] **Expected**: No accessibility violations

#### 4. WAVE Extension
- [ ] **Test**: Run WAVE on each page
- [ ] **Expected**: No errors
- [ ] **Expected**: Minimal warnings

## Testing Checklist Summary

### Before Release
- [ ] All automated tests pass
- [ ] Keyboard navigation works completely
- [ ] Screen reader testing completed
- [ ] Color contrast verified (WCAG AA)
- [ ] Focus management tested
- [ ] Forms are fully accessible
- [ ] Mobile accessibility verified
- [ ] Cross-browser testing completed
- [ ] Manual testing checklist completed
- [ ] Accessibility audit score > 95%

### Ongoing Monitoring
- [ ] Set up automated accessibility testing in CI/CD
- [ ] Regular manual testing schedule established
- [ ] User feedback mechanism for accessibility issues
- [ ] Team training on accessibility best practices

## Common Issues and Solutions

### Issue: Focus not visible
**Solution**: Ensure focus-visible styles are implemented and have sufficient contrast

### Issue: Screen reader not announcing changes
**Solution**: Use ARIA live regions for dynamic content updates

### Issue: Form errors not announced
**Solution**: Use role="alert" and aria-live="assertive" for error messages

### Issue: Skip links not working
**Solution**: Ensure target elements are focusable (add tabindex="-1" if needed)

### Issue: Mobile touch targets too small
**Solution**: Ensure minimum 44x44 pixel touch targets with adequate spacing

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)