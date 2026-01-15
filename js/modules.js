/**
 * SALARYMAN LIFE SIMULATOR - 9 Core Calculation Modules
 * Pure mathematical functions. No randomness. Brutal honesty.
 */

// ============ MODULE 1: LIFE VALUE ENGINE (Time Cost) ============
/**
 * Calculate hourly wage from salary
 * Formula: hourlyWage = salary / (workDays * workHours)
 */
function module1_calculateHourlyWage(salary, workDays, workHours) {
  if (workDays === 0 || workHours === 0) return 0;
  return salary / (workDays * workHours);
}

/**
 * Convert monetary cost to time (hours/days of work needed)
 * Example: ¥10,000 item costs X hours of work
 */
function module1_calculateTimeCost(price, hourlyWage) {
  if (hourlyWage === 0) return 0;
  const hours = price / hourlyWage;
  const days = hours / 8; // Assuming 8-hour workday
  return {
    price: price,
    hourlyWage: hourlyWage,
    hoursOfWork: hours,
    daysOfWork: days,
    hoursRounded: Math.round(hours),
    daysRounded: Math.round(days),
  };
}

// ============ MODULE 2: THE DEBT SPIRAL (Past Chains) ============
/**
 * Calculate total monthly debt commitment from all sources
 * Formula: monthlyDebtCommitment = sum(installments.monthly) + (creditCardDebt * minPayRate)
 */
function module2_calculateMonthlyDebtCommitment(creditCardDebt, minPayRate, installments) {
  let installmentSum = installments.reduce((sum, inst) => sum + inst.monthly, 0);
  let creditCardMinPayment = creditCardDebt * minPayRate;
  return installmentSum + creditCardMinPayment;
}

/**
 * Calculate months until debt-free if paying minimum payments
 * Simplified logic: based on installments
 */
function module2_calculateDebtFreedomDate(creditCardDebt, minPayRate, installments) {
  if (creditCardDebt === 0 && installments.length === 0) return 0;

  // For installments, find max months remaining
  const installmentMonths = installments.length > 0 ? Math.max(...installments.map((i) => i.monthsLeft)) : 0;

  // For credit card (simplified: assume 5% monthly reduction)
  let creditCardMonths = 0;
  if (creditCardDebt > 0) {
    let balance = creditCardDebt;
    while (balance > 0) {
      balance -= balance * minPayRate;
      creditCardMonths++;
      if (creditCardMonths > 360) break; // Safety limit
    }
  }

  return Math.max(installmentMonths, creditCardMonths);
}

/**
 * Get debt breakdown for transparency
 */
function module2_getDebtBreakdown(creditCardDebt, minPayRate, installments) {
  return {
    creditCardDebt: creditCardDebt,
    creditCardMinPayment: creditCardDebt * minPayRate,
    installmentCount: installments.length,
    installmentTotal: installments.reduce((sum, i) => sum + i.monthly, 0),
    installmentDetails: installments,
    totalMonthlyCommitment: module2_calculateMonthlyDebtCommitment(creditCardDebt, minPayRate, installments),
    debtFreedomMonths: module2_calculateDebtFreedomDate(creditCardDebt, minPayRate, installments),
  };
}

// ============ MODULE 3: SOCIAL TAX (Unavoidable Leaks) ============
/**
 * Calculate monthly social spending (weddings, dinners, etc.)
 * Formula: monthlySocialCost = socialEventsPerMonth * faceTaxPerEvent
 */
function module3_calculateMonthlySocialCost(socialEventsPerMonth, faceTaxPerEvent) {
  return socialEventsPerMonth * faceTaxPerEvent;
}

/**
 * Annual social impact
 */
function module3_getAnnualSocialCost(socialEventsPerMonth, faceTaxPerEvent) {
  return module3_calculateMonthlySocialCost(socialEventsPerMonth, faceTaxPerEvent) * 12;
}

// ============ MODULE 4: HEALTH DEPRECIATION (Hidden Cost) ============
/**
 * Calculate health penalty score
 * Increases risk of accidents and health emergencies
 * Formula: 
 *   - sleepHours < 6: +20% risk per day
 *   - junkFoodMeals > 5/week: +10% risk
 *   - Cumulative effect on accident probability
 */
function module4_calculateHealthPenaltyScore(sleepHours, junkFoodMeals) {
  let penaltyScore = 0;

  // Sleep penalty: 20% risk increase per hour below 6
  if (sleepHours < 6) {
    penaltyScore += (6 - sleepHours) * 0.2;
  }

  // Junk food penalty: 10% per meal above 5/week
  if (junkFoodMeals > 5) {
    penaltyScore += (junkFoodMeals - 5) * 0.1;
  }

  // Cap at reasonable level
  penaltyScore = Math.min(penaltyScore, 2.0); // Max 200% increase

  return penaltyScore;
}

/**
 * Get health status indicator
 */
function module4_getHealthStatus(sleepHours, junkFoodMeals) {
  const penalty = module4_calculateHealthPenaltyScore(sleepHours, junkFoodMeals);

  let status = "EXCELLENT";
  let color = "GREEN";

  if (penalty > 1.5) {
    status = "CRITICAL";
    color = "RED";
  } else if (penalty > 1.0) {
    status = "POOR";
    color = "ORANGE";
  } else if (penalty > 0.5) {
    status = "FAIR";
    color = "YELLOW";
  }

  return { status, color, penaltyScore: penalty };
}

// ============ MODULE 5: SANITY & PASSION FUND (Dreams vs Impatience) ============
/**
 * Impatience Calculator: Show cost of buying now vs. saving later
 * Formula:
 *   - costIfSaved: Just the item price
 *   - costIfCredit: price + (price * interestRate * monthsToPay)
 *   - stupidityTax: costIfCredit - costIfSaved
 *   - timeToWait: price / monthlySavingCapacity
 */
function module5_impatienteCalculator(dreamItemCost, monthlySavingCapacity, creditInterestRate, monthsToPayIfCredit) {
  const costIfSaved = dreamItemCost;

  // Calculate interest on credit
  const totalInterest = dreamItemCost * creditInterestRate * monthsToPayIfCredit;
  const costIfCredit = dreamItemCost + totalInterest;

  const stupidityTax = costIfCredit - costIfSaved;
  const timeToWaitMonths = monthlySavingCapacity > 0 ? dreamItemCost / monthlySavingCapacity : Infinity;

  return {
    dreamItemCost: dreamItemCost,
    creditInterestRate: creditInterestRate,
    monthsToPayIfCredit: monthsToPayIfCredit,
    costIfSaved: Math.round(costIfSaved),
    costIfCredit: Math.round(costIfCredit),
    stupidityTax: Math.round(stupidityTax),
    stupidityTaxPercent: ((stupidityTax / costIfSaved) * 100).toFixed(1),
    timeToWaitMonths: timeToWaitMonths === Infinity ? "∞" : timeToWaitMonths.toFixed(1),
    savingCapacity: monthlySavingCapacity,
    verdict:
      stupidityTax > costIfSaved * 0.25
        ? "⚠️ TERRIBLE DEAL - Save instead!"
        : stupidityTax > costIfSaved * 0.1
          ? "❌ Bad deal - Consider saving"
          : "✓ Acceptable",
  };
}

/**
 * Passion budget status
 */
function module5_getPassionBudgetStatus(passionFundBudget, monthlyNet) {
  const percentOfNet = monthlyNet > 0 ? (passionFundBudget / monthlyNet) * 100 : 0;

  let status = "HEALTHY";
  if (percentOfNet > 10) status = "EXCESSIVE";
  if (percentOfNet === 0) status = "MISSING";

  return {
    passionBudget: passionFundBudget,
    percentOfMonthlyNet: percentOfNet.toFixed(1),
    status: status,
    message:
      status === "MISSING"
        ? "⚠️ No budget for sanity! Mental health costs"
        : status === "EXCESSIVE"
          ? "⚠️ High passion budget - prioritize essentials first"
          : "✓ Healthy passion budget allocation",
  };
}

// ============ MODULE 6: ACCIDENT & INSURANCE (The Shock) ============
/**
 * Accident types and base costs
 */
const ACCIDENT_TYPES = {
  MINOR_CAR: { name: "Minor Car Repair", baseCost: 50000 },
  MAJOR_CAR: { name: "Major Car Repair", baseCost: 200000 },
  HOSPITALIZATION: { name: "Hospital Visit", baseCost: 500000 },
  DENTAL: { name: "Dental Emergency", baseCost: 100000 },
  PHONE_REPLACEMENT: { name: "Phone Replacement", baseCost: 80000 },
  EMERGENCY_TRAVEL: { name: "Emergency Travel", baseCost: 300000 },
};

/**
 * Calculate actual cost after health penalty and insurance
 * Formula: actualCost = baseCost * (1 + healthPenaltyScore) - insurance coverage
 */
function module6_triggerAccident(accidentType, healthPenaltyScore, insurance) {
  const accident = ACCIDENT_TYPES[accidentType] || ACCIDENT_TYPES.MINOR_CAR;

  // Apply health penalty
  const costAfterHealth = accident.baseCost * (1 + healthPenaltyScore);

  // Apply insurance
  const insuredAmount = Math.min(costAfterHealth * insurance.coverage, insurance.limit);
  const outOfPocket = costAfterHealth - insuredAmount;

  return {
    accidentType: accident.name,
    baseCost: accident.baseCost,
    healthPenaltyMultiplier: 1 + healthPenaltyScore,
    costAfterHealth: Math.round(costAfterHealth),
    insuranceCoverage: insurance.coverage * 100,
    insuredAmount: Math.round(insuredAmount),
    outOfPocketCost: Math.round(outOfPocket),
    severity:
      outOfPocket > 500000
        ? "🔴 CRITICAL"
        : outOfPocket > 200000
          ? "🟠 SEVERE"
          : outOfPocket > 50000
            ? "🟡 MODERATE"
            : "🟢 MINOR",
  };
}

/**
 * Get all possible accident types
 */
function module6_getAccidentTypes() {
  return Object.keys(ACCIDENT_TYPES).map((key) => ({
    id: key,
    ...ACCIDENT_TYPES[key],
  }));
}

// ============ MODULE 7: SURVIVAL METER (Dashboard) ============
/**
 * Calculate real daily budget available
 * Formula: dailyBudgetReal = netAvailableCash / daysUntilPayday
 */
function module7_calculateDailyBudgetReal(netAvailableCash, daysUntilPayday) {
  if (daysUntilPayday === 0) return 0;
  return netAvailableCash / daysUntilPayday;
}

/**
 * Calculate survival index
 * Formula: survivalIndex = dailyBudgetReal / dailyBurnAvg
 * < 1.0: RED (Danger)
 * 1.0 - 1.3: YELLOW (Tight)
 * >= 1.3: GREEN (Safe)
 */
function module7_calculateSurvivalIndex(dailyBudgetReal, dailyBurnAvg) {
  if (dailyBurnAvg === 0) return 0;
  return dailyBudgetReal / dailyBurnAvg;
}

/**
 * Get survival status with color code
 */
function module7_getSurvivalStatus(survivalIndex) {
  if (survivalIndex < 1.0) {
    return {
      status: "DANGER",
      color: "RED",
      emoji: "🔴",
      message: "Critical: You're spending more than available. Debt incoming!",
    };
  } else if (survivalIndex < 1.3) {
    return {
      status: "TIGHT",
      color: "YELLOW",
      emoji: "🟡",
      message: "Caution: Little buffer. One accident = trouble.",
    };
  } else {
    return {
      status: "SAFE",
      color: "GREEN",
      emoji: "🟢",
      message: "Good: You can cover daily expenses + build buffer.",
    };
  }
}

// ============ MODULE 8: YEAR-END PROJECTION (Butterfly Effect) ============
/**
 * Project income/outcome at year-end
 * Formula: monthlyNet = salary - fixedCosts - debtCommitment - socialCost - (dailyBurnAvg * 30) - passionFundBudget
 */
function module8_calculateMonthlyNet(
  salary,
  fixedCosts,
  debtCommitment,
  socialCost,
  dailyBurnAvg,
  passionFundBudget,
  insurance_premium
) {
  const monthlyEssentials = dailyBurnAvg * 30;
  return salary - fixedCosts - debtCommitment - socialCost - monthlyEssentials - passionFundBudget - insurance_premium;
}

/**
 * Project year-end cash position
 */
function module8_projectYearEnd(currentCash, monthlyNet, monthsRemaining) {
  const projectedCash = currentCash + monthlyNet * monthsRemaining;

  return {
    currentCash: currentCash,
    monthlyNet: monthlyNet,
    monthsRemaining: monthsRemaining,
    projectedYearEnd: Math.round(projectedCash),
    trend: projectedCash > currentCash ? "📈 IMPROVING" : projectedCash < currentCash ? "📉 DECLINING" : "➡️ FLAT",
    warning:
      projectedCash < 0
        ? `🚨 BANKRUPT: You'll owe ¥${Math.abs(Math.round(projectedCash))} by year-end!`
        : projectedCash < 100000
          ? "⚠️ Low cash runway. Focus on income or cutting costs."
          : "✓ Positive trajectory",
  };
}

// ============ MODULE 9: REWARDS (Micro-Reinforcement) ============
/**
 * Calculate savings "treats" - gamification element
 * If actualDailySpending < dailyBudgetReal, convert difference to treats
 */
function module9_calculateTreats(savingsAmount) {
  const treatPrices = {
    bubbletea: 4000,
    coffee: 3000,
    lunch: 8000,
    movie: 15000,
    massage: 30000,
    weekend_trip: 100000,
  };

  const treats = {};
  for (const [treat, price] of Object.entries(treatPrices)) {
    treats[treat] = Math.floor(savingsAmount / price);
  }

  // Find most impactful treat
  let bestTreat = "bubbletea";
  let maxTreats = treats.bubbletea;

  for (const [treat, count] of Object.entries(treats)) {
    if (count > maxTreats && count > 0) {
      maxTreats = count;
      bestTreat = treat;
    }
  }

  return {
    savingsAmount: savingsAmount,
    treats: treats,
    bestTreat: bestTreat,
    maxTreats: maxTreats,
    message:
      maxTreats === 0
        ? "Keep saving! Every bit counts."
        : `🎉 You saved enough for ${maxTreats} ${bestTreat}!`,
  };
}

/**
 * Generate motivational message based on performance
 */
function module9_getMotivation(survivalStatus, monthlyNet, healthStatus, debtMonths) {
  let messages = [];

  if (survivalStatus.status === "SAFE") {
    messages.push("✓ Your cashflow is healthy!");
  }
  if (monthlyNet > 50000) {
    messages.push("💪 Strong savings rate - keep this up!");
  }
  if (healthStatus.status === "EXCELLENT") {
    messages.push("❤️ Your health investments are paying off!");
  }
  if (debtMonths === 0) {
    messages.push("🎊 DEBT FREE! Financial freedom is within reach!");
  }

  return messages.length > 0 ? messages.join(" ") : "⚠️ Time to make some changes.";
}
