# ✅ Testing Checklist

## Functionality Tests

### ✓ Module 1: Life Value Engine
- [ ] Hourly wage calculates correctly from salary/workDays/workHours
- [ ] Time cost calculator shows hours and days for item price
- [ ] Updates when salary/work parameters change

### ✓ Module 2: The Debt Spiral
- [ ] Monthly debt commitment calculates (credit card + installments)
- [ ] Debt freedom date shows months/years
- [ ] Shows "NEVER" when minimum payment ≤ interest
- [ ] Can add installments with name, monthly, months left
- [ ] Can remove installments
- [ ] Installment list updates correctly

### ✓ Module 3: Social Tax
- [ ] Monthly social cost calculates (events × cost per event)
- [ ] Updates when inputs change
- [ ] Displays correctly

### ✓ Module 4: Health Depreciation
- [ ] Health penalty calculates from sleep hours
- [ ] Health penalty calculates from junk food meals
- [ ] Health bar visual updates and changes color
- [ ] Penalty percentage displays correctly
- [ ] Color changes: green (low) → yellow (medium) → red (high)

### ✓ Module 5: Impatience Calculator
- [ ] Cost if saved displays correctly
- [ ] Cost if credit calculates with interest
- [ ] Stupidity tax shows difference
- [ ] Time to save calculates in months
- [ ] Shows cost in wasted work days
- [ ] Updates when inputs change

### ✓ Module 6: Accident & Insurance Simulator
- [ ] Can select accident type from dropdown
- [ ] Base cost displays for each accident type
- [ ] Health multiplier applies correctly
- [ ] Insurance coverage calculates correctly
- [ ] Out-of-pocket cost shows correctly
- [ ] Impact on cash displays
- [ ] Shows warning if would go into debt

### ✓ Module 7: Survival Meter
- [ ] Net available cash calculates correctly
- [ ] Daily budget calculates from net cash / days until payday
- [ ] Survival index calculates correctly
- [ ] Status shows: RED (< 1.0), YELLOW (1.0-1.3), GREEN (> 1.3)
- [ ] Status color changes correctly
- [ ] Survival bar visual updates
- [ ] Survival bar width reflects index

### ✓ Module 8: Year-End Projection
- [ ] Monthly net calculates from all income/expenses
- [ ] Months left calculates from current date
- [ ] Projected year-end calculates correctly
- [ ] Shows warning if negative projection
- [ ] Shows encouragement if positive projection
- [ ] Updates when any input changes

### ✓ Module 9: Visual Bars
- [ ] Debt bar shows percentage of salary consumed by debt
- [ ] Salary/available bar shows remaining percentage
- [ ] Health bar shows health level (100% - penalty)
- [ ] Health bar color changes with health level
- [ ] Survival bar shows survival index visually
- [ ] All bars animate smoothly

### ✓ Preset Scenarios
- [ ] "Struggling Salaryman" button loads correct values
- [ ] "Balanced Life" button loads correct values
- [ ] "Thriving Professional" button loads correct values
- [ ] All input fields update when preset loads
- [ ] Notification appears when preset loads
- [ ] Notification disappears after 3 seconds

### ✓ Master Recalculation
- [ ] All metrics update when ANY input changes
- [ ] Sequential data flow works correctly
- [ ] No circular dependencies
- [ ] Performance is smooth (no lag)

## UI/UX Tests

### ✓ Responsive Design
- [ ] Desktop: Two-column layout works
- [ ] Tablet: Single column layout works
- [ ] Mobile: All elements are readable and usable
- [ ] Form inputs are easy to tap on mobile
- [ ] Buttons are appropriately sized

### ✓ Visual Feedback
- [ ] Input fields highlight on focus
- [ ] Buttons show hover effects
- [ ] Cards have subtle hover animations
- [ ] Color coding is consistent (RED=danger, YELLOW=warning, GREEN=safe)
- [ ] All text is readable (good contrast)

### ✓ Accessibility
- [ ] All inputs have labels
- [ ] Tab order is logical
- [ ] Can navigate with keyboard
- [ ] Color is not the only indicator (also uses text)

### ✓ Performance
- [ ] Page loads quickly
- [ ] Calculations are instant
- [ ] No visible lag when typing
- [ ] Animations are smooth
- [ ] Works on older browsers

## Integration Tests

### ✓ Scenario 1: Zero to Hero
1. Start with "Struggling Salaryman" preset
2. Verify status is RED
3. Increase salary by 20%
4. Verify status improves
5. Pay off credit card debt (set to 0)
6. Verify debt freedom shows 0 months
7. Improve health (sleep=7, junk=3)
8. Verify health penalty decreases
9. Check year-end projection is now positive

### ✓ Scenario 2: The Debt Trap
1. Start with "Balanced Life" preset
2. Simulate high credit card debt (100,000)
3. Keep minimum payment at 10%
4. Verify shows "NEVER" for debt freedom
5. Increase minimum payment to 20%
6. Verify shows reasonable timeframe

### ✓ Scenario 3: Impatience Cost
1. Enter dream item: 30,000
2. Set months to pay: 12
3. Verify stupidity tax is ~4,000-5,000
4. Change months to 6
5. Verify stupidity tax decreases
6. Compare to monthly net to see feasibility

### ✓ Scenario 4: Health Matters
1. Set poor health (sleep=4, junk=15)
2. Check health penalty (should be 50%+)
3. Simulate hospital visit (15,000 base)
4. Note the actual cost (~22,500+)
5. Improve health (sleep=7, junk=3)
6. Simulate same accident
7. Verify cost is much lower (~15,000)

### ✓ Scenario 5: Social Burden
1. Set social events to 0
2. Note survival index
3. Increase to 5 events at 3,000 each
4. Verify survival index drops significantly
5. Check year-end projection worsens

## Edge Cases

### ✓ Invalid Inputs
- [ ] Zero salary: Should handle gracefully
- [ ] Negative numbers: Should handle or prevent
- [ ] Very large numbers: Should format correctly with commas
- [ ] Empty fields: Should default to 0

### ✓ Extreme Scenarios
- [ ] No income, high debt: Should show severe RED
- [ ] High income, no debt: Should show strong GREEN
- [ ] All zeros: Should not crash
- [ ] Negative survival index: Should display correctly

### ✓ Date Edge Cases
- [ ] Test in January (11 months left)
- [ ] Test in December (0 months left)
- [ ] Verify projection makes sense

## Cross-Browser Tests

- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Edge: All features work
- [ ] Mobile Chrome: All features work
- [ ] Mobile Safari: All features work

## Documentation Tests

- [ ] README.md is clear and comprehensive
- [ ] FORMULA_GUIDE.md formulas are correct
- [ ] QUICK_START.md scenarios match app behavior
- [ ] All examples in docs use realistic numbers
- [ ] Code comments are helpful

## Final Checks

- [ ] No console errors in browser
- [ ] No 404 errors for assets
- [ ] All links work (if any)
- [ ] Thai Baht symbol (฿) displays correctly
- [ ] Number formatting with commas works
- [ ] All calculations match FORMULA_GUIDE.md

---

## Test Results

**Date Tested**: _______________
**Browser**: _______________
**Device**: _______________

**Overall Status**: ⬜ PASS / ⬜ FAIL

**Issues Found**:
1. _______________
2. _______________
3. _______________

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________

---

## How to Test Manually

### Quick Test (5 minutes)
1. Open `index.html` in browser
2. Click each preset button - verify it loads
3. Change a few inputs - verify dashboard updates
4. Try the Impatience Calculator
5. Simulate an accident
6. Check for console errors (F12)

### Thorough Test (30 minutes)
1. Go through each module systematically
2. Test with realistic values
3. Test edge cases (zeros, very high/low numbers)
4. Test on mobile device
5. Test in different browser
6. Verify formulas against FORMULA_GUIDE.md

### User Acceptance Test
1. Give to a friend/colleague
2. Ask them to enter their real financial situation
3. See if the results make sense to them
4. Get feedback on clarity and usefulness
5. Note any confusion or bugs

---

**Made with brutal honesty and pure math. No AI guessing, just consequences.**
