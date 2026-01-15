/**
 * SALARYMAN LIFE SIMULATOR - Core State Object
 * Central reactive state representing the user's entire life
 * Philosophy: Interconnectedness. Every change affects everything.
 */

const LifeState = {
  // ============ 1. INCOME & TIME ============
  salary: 360000, // Monthly salary in local currency (e.g., ¥360,000)
  workDays: 22, // Working days per month
  workHours: 8, // Hours per working day

  // ============ 2. ASSETS & CASHFLOW ============
  currentCash: 50000, // Cash on hand
  fixedCosts: 100000, // Rent, subscriptions, utilities per month
  dailyBurnAvg: 2000, // Essential daily spending (food, transport)
  daysUntilPayday: 10, // Days remaining until next salary

  // ============ 3. THE DEBT TRAP ============
  creditCardDebt: 0, // Outstanding credit card debt
  minPayRate: 0.10, // Minimum payment as % of balance (10%)
  installments: [], // Array of { name, monthly, monthsLeft }
  // Example: { name: "iPhone 15", monthly: 3000, monthsLeft: 24 }

  // ============ 4. SOCIAL & FACE ============
  socialEventsPerMonth: 2, // Weddings, parties, dinners
  faceTaxPerEvent: 8000, // Cost per event (gift + outfit + transport)

  // ============ 5. HEALTH & RISK ============
  sleepHours: 6, // Average hours of sleep per night
  junkFoodMeals: 3, // Number of junk/fast food meals per week
  insurance: {
    premium: 5000, // Monthly insurance premium
    coverage: 0.8, // Coverage percentage (80% = pays 80% of cost)
    limit: 500000, // Maximum coverage per incident
  },

  // ============ 6. PASSION & SANITY ============
  passionFundBudget: 10000, // Monthly budget for hobbies/dreams
  stressLevel: 5, // Current stress level (1-10)

  // ============ 7. GOALS ============
  savingsTarget: 100000, // Target monthly savings

  // ============ COMPUTED PROPERTIES ============
  // These are calculated and cached
  _computed: {
    hourlyWage: 0,
    monthlyDebtCommitment: 0,
    debtFreedomDate: 0,
    monthlySocialCost: 0,
    healthPenaltyScore: 0,
    netAvailableCash: 0,
    dailyBudgetReal: 0,
    survivalIndex: 0,
    survivalStatus: "UNKNOWN",
    monthlyNet: 0,
    projectedYearEnd: 0,
    impatience: {
      dreamItemCost: 5000,
      creditInterestRate: 0.16,
      costIfSaved: 0,
      costIfCredit: 0,
      stupidityTax: 0,
      timeToWaitMonths: 0,
    },
  },
};

/**
 * Utility: Deep clone state to detect changes
 */
function cloneState() {
  return JSON.parse(JSON.stringify(LifeState));
}

/**
 * Utility: Reset state to defaults
 */
function resetState() {
  LifeState.salary = 360000;
  LifeState.workDays = 22;
  LifeState.workHours = 8;
  LifeState.currentCash = 50000;
  LifeState.fixedCosts = 100000;
  LifeState.dailyBurnAvg = 2000;
  LifeState.daysUntilPayday = 10;
  LifeState.creditCardDebt = 0;
  LifeState.minPayRate = 0.10;
  LifeState.installments = [];
  LifeState.socialEventsPerMonth = 2;
  LifeState.faceTaxPerEvent = 8000;
  LifeState.sleepHours = 6;
  LifeState.junkFoodMeals = 3;
  LifeState.insurance = {
    premium: 5000,
    coverage: 0.8,
    limit: 500000,
  };
  LifeState.passionFundBudget = 10000;
  LifeState.stressLevel = 5;
  LifeState.savingsTarget = 100000;
}

/**
 * Utility: Update state field
 */
function updateState(field, value) {
  if (field in LifeState) {
    LifeState[field] = parseFloat(value) || 0;
  }
}

/**
 * Utility: Add installment
 */
function addInstallment(name, monthly, monthsLeft) {
  LifeState.installments.push({
    name: name,
    monthly: parseFloat(monthly) || 0,
    monthsLeft: parseInt(monthsLeft) || 0,
  });
}

/**
 * Utility: Remove installment by index
 */
function removeInstallment(index) {
  if (index >= 0 && index < LifeState.installments.length) {
    LifeState.installments.splice(index, 1);
  }
}

/**
 * Utility: Clear all installments
 */
function clearInstallments() {
  LifeState.installments = [];
}
