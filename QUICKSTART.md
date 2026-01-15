# 🎯 Salaryman Life Simulator - Quick Start Guide

## 📁 Project Structure

```
managemoney/
├── index.html                 # Main HTML interface
├── js/
│   ├── state.js              # Core LifeState object & data structure
│   ├── modules.js            # All 9 calculation modules (pure functions)
│   ├── calculator.js         # Master recalculateAll() integration logic
│   └── ui.js                 # Event listeners & UI updates
└── css/
    └── style.css             # Responsive dashboard styling
```

## 🚀 How to Run

1. **Open in Browser:**
   ```bash
   # Using Python 3 (built-in server)
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

   Or simply open `index.html` directly in your browser.

2. **Start Simulating:**
   - Adjust inputs on the left panel
   - Watch calculations update in real-time on the right
   - Switch between tabs: Dashboard, Detailed Breakdown, Impatience Calculator, Accident Simulator

## 📊 The 9 Core Modules

### Module 1: Life Value Engine ⏱️
Convert money into "life hours" - How many days of work does an item cost?
- `module1_calculateHourlyWage()` - Hourly wage = Salary / (workDays × workHours)
- `module1_calculateTimeCost()` - Shows work days needed to afford an item

### Module 2: The Debt Spiral 🔗
Calculate total debt commitment and when you'll be debt-free
- `module2_calculateMonthlyDebtCommitment()` - Sum of all debt payments
- `module2_calculateDebtFreedomDate()` - Months until zero debt

### Module 3: Social Tax 👥
The cost of saving face in society (weddings, dinners, etc.)
- `module3_calculateMonthlySocialCost()` - Events × cost per event
- `module3_getAnnualSocialCost()` - Annual leakage

### Module 4: Health Depreciation ❤️
Your poor sleep & diet increases accident risk
- `module4_calculateHealthPenaltyScore()` - Risk multiplier based on health
- `module4_getHealthStatus()` - Current health assessment

### Module 5: Sanity & Passion Fund 🎨
Allocate budget for dreams + show cost of impatience
- `module5_impatienteCalculator()` - Save vs Buy Now comparison
- `module5_getPassionBudgetStatus()` - Is your budget healthy?

### Module 6: Accident & Insurance 💥
Simulate accidents with health penalty applied
- `module6_triggerAccident()` - Calculate actual out-of-pocket cost
- `module6_getAccidentTypes()` - List all possible accidents

### Module 7: Survival Meter 🚨
Real-time dashboard showing financial danger level
- `module7_calculateSurvivalIndex()` - (Available Budget / Daily Burn)
- `module7_getSurvivalStatus()` - GREEN/YELLOW/RED status

### Module 8: Year-End Projection 📈
Butterfly effect - project where you'll be by Dec 31
- `module8_calculateMonthlyNet()` - True disposable income
- `module8_projectYearEnd()` - Where you'll be in 11 months

### Module 9: Rewards 🎁
Gamification - convert savings into "treat units"
- `module9_calculateTreats()` - How many bubble teas did you save for?
- `module9_getMotivation()` - Supportive reality check

## 🔑 Key Functions

### `recalculateAll()`
**The master orchestrator.** Triggers whenever ANY input changes.

Flow:
1. Calculate hourly wage
2. Deduct past (debt)
3. Deduct future protection (insurance + savings target)
4. Deduct sanity (passion fund)
5. Deduct social tax
6. Calculate survival meter
7. Apply health modifiers
8. Project year-end

```javascript
recalculateAll(); // Call this whenever state changes
```

### `getFullReport()`
Returns comprehensive JSON with all computed metrics:
```javascript
const report = getFullReport();
console.log(report);
```

### `debugSimulator()`
Full debug output in console:
```javascript
debugSimulator();
```

## 📝 Core Data Structure (LifeState)

```javascript
const LifeState = {
  // Income & Time
  salary: 360000,
  workDays: 22,
  workHours: 8,
  
  // Assets & Cashflow
  currentCash: 50000,
  fixedCosts: 100000,
  dailyBurnAvg: 2000,
  daysUntilPayday: 10,
  
  // Debt
  creditCardDebt: 0,
  minPayRate: 0.10,
  installments: [{ name: "iPhone", monthly: 3000, monthsLeft: 24 }],
  
  // Social & Face
  socialEventsPerMonth: 2,
  faceTaxPerEvent: 8000,
  
  // Health & Risk
  sleepHours: 6,
  junkFoodMeals: 3,
  insurance: { premium: 5000, coverage: 0.8, limit: 500000 },
  
  // Passion & Sanity
  passionFundBudget: 10000,
  stressLevel: 5,
  
  // Goals
  savingsTarget: 100000,
  
  // Computed (auto-calculated)
  _computed: { /* ... */ }
};
```

## 🎮 Updating State

```javascript
// Update single field
updateState('salary', 400000);

// Add installment
addInstallment('iPhone', 3000, 24);

// Remove installment by index
removeInstallment(0);

// Clear all installments
clearInstallments();

// Reset to defaults
resetState();

// Deep clone for comparison
const oldState = cloneState();
```

## 🎨 UI Features

### Dashboard Tab
- **Survival Meter:** Real-time danger assessment
- **Flow Chart:** Visual money breakdown
- **Modules 1-8:** All calculations displayed
- **Motivation:** Personalized message

### Detailed Breakdown Tab
- Full JSON report of all computed metrics
- For debugging and detailed analysis

### Impatience Calculator Tab
- "Stupidity Tax" - cost of buying on credit vs. saving
- Shows brutal reality of credit card interest
- Input: Dream item cost + interest rate

### Accident Simulator Tab
- See how poor health increases accident costs
- Simulate different accident scenarios
- Shows insurance coverage in action

## 🎯 Philosophy

This simulator embodies three core principles:

1. **Interconnectedness:** Change one metric, see ripple effects across everything
2. **Brutal Honesty:** No sugar-coating. Real math. Real consequences.
3. **Determinism:** Pure formulas. No random number generators. Same inputs = same outputs.

## 💡 Key Insights

The simulator reveals these harsh truths:

1. **Debt eats the majority of salary** before you even see it
2. **Health neglect has financial costs** - bad health → accidents → debt
3. **Impatience is expensive** - credit card interest makes items 25-50% more expensive
4. **Social obligations are a huge leak** - ¥8,000 × 2 events = ¥16,000/month = ¥192,000/year
5. **Mental health matters financially** - burnout = worse decisions = more debt
6. **Survival margin is thin** - Most salarymen live 1-2 accidents away from crisis

## 🔧 Customization

### Add New Accident Types
Edit in `modules.js`:
```javascript
const ACCIDENT_TYPES = {
  // Add new type here
  CUSTOM_ACCIDENT: { name: "Custom Event", baseCost: 50000 }
};
```

### Add New Treats
Edit in `modules.js`:
```javascript
function module9_calculateTreats(savingsAmount) {
  const treatPrices = {
    bubbletea: 4000,
    // Add new treat here
    newtreat: 10000
  };
  // ...
}
```

### Adjust Module Logic
Each module is a pure function in `modules.js`. Modify formulas directly.

## 🐛 Debug Commands

In browser console:
```javascript
debugSimulator();        // Full debug output
LifeState;              // View current state
getFullReport();        // Get full computed report
recalculateAll();       // Force recalculation
resetState();           // Reset to defaults
```

## 📖 Documentation

- **state.js:** Data structure documentation
- **modules.js:** Formula documentation for each module
- **calculator.js:** Integration logic flow
- **ui.js:** Event binding and display update logic

## ✅ Features Included

- ✓ Real-time calculations on every input change
- ✓ Pure mathematical formulas (no randomness)
- ✓ Tab-based navigation
- ✓ Responsive design (mobile-friendly)
- ✓ Dark/light color coding (danger/safe)
- ✓ Installment loan manager
- ✓ Impatience calculator with "stupidity tax"
- ✓ Accident simulator with insurance
- ✓ Year-end financial projection
- ✓ Gamification (treats/rewards)
- ✓ Motivational feedback

---

**Built with brutal honesty and pure math. No sugar-coating. Just reality.**
