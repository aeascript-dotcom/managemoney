/**
 * SALARYMAN LIFE SIMULATOR - Master Integration Logic
 * The "Super Formula" that orchestrates all calculations
 * Data flow:
 * 1. Start with Salary
 * 2. Deduct Debt Commitments
 * 3. Deduct Insurance & Savings Target
 * 4. Deduct Passion Fund (mental health)
 * 5. Deduct Social Tax
 * 6. Result: True Disposable Income
 * 7. Calculate Survival Meter
 * 8. Apply Health Score adjustments
 * 9. Project to Year-End
 */

/**
 * MASTER RECALCULATION ENGINE
 * Call this whenever ANY state changes
 */
function recalculateAll() {
  console.log("🔄 Recalculating all life metrics...");

  // ===== STEP 1: CALCULATE BASIC WAGE INFO =====
  const hourlyWage = module1_calculateHourlyWage(LifeState.salary, LifeState.workDays, LifeState.workHours);
  LifeState._computed.hourlyWage = hourlyWage;

  // ===== STEP 2: DEDUCT PAST (Debt) =====
  const monthlyDebtCommitment = module2_calculateMonthlyDebtCommitment(
    LifeState.creditCardDebt,
    LifeState.minPayRate,
    LifeState.installments
  );
  const debtFreedomMonths = module2_calculateDebtFreedomDate(LifeState.creditCardDebt, LifeState.minPayRate, LifeState.installments);

  LifeState._computed.monthlyDebtCommitment = monthlyDebtCommitment;
  LifeState._computed.debtFreedomDate = debtFreedomMonths;

  // ===== STEP 3: DEDUCT FUTURE PROTECTION (Insurance + Savings Target) =====
  const totalProtection = LifeState.insurance.premium + LifeState.savingsTarget;

  // ===== STEP 4: DEDUCT SANITY (Passion Fund) =====
  const passionDeduction = LifeState.passionFundBudget;

  // ===== STEP 5: DEDUCT SOCIAL =====
  const monthlySocialCost = module3_calculateMonthlySocialCost(
    LifeState.socialEventsPerMonth,
    LifeState.faceTaxPerEvent
  );
  LifeState._computed.monthlySocialCost = monthlySocialCost;

  // ===== STEP 6: CALCULATE TRUE DISPOSABLE INCOME =====
  const monthlyEssentials = LifeState.dailyBurnAvg * 30;
  const trueDisposableIncome = LifeState.salary - LifeState.fixedCosts - monthlyDebtCommitment - totalProtection - passionDeduction - monthlySocialCost - monthlyEssentials;

  // ===== STEP 7: CALCULATE NET AVAILABLE CASH =====
  const netAvailableCash = LifeState.currentCash - LifeState.fixedCosts - monthlyDebtCommitment - monthlySocialCost;
  LifeState._computed.netAvailableCash = Math.round(netAvailableCash);

  // ===== STEP 7b: CALCULATE REAL DAILY BUDGET =====
  const dailyBudgetReal = module7_calculateDailyBudgetReal(netAvailableCash, LifeState.daysUntilPayday);
  LifeState._computed.dailyBudgetReal = Math.round(dailyBudgetReal);

  // ===== STEP 7c: CALCULATE SURVIVAL INDEX =====
  const survivalIndex = module7_calculateSurvivalIndex(dailyBudgetReal, LifeState.dailyBurnAvg);
  LifeState._computed.survivalIndex = survivalIndex.toFixed(2);

  const survivalStatus = module7_getSurvivalStatus(survivalIndex);
  LifeState._computed.survivalStatus = survivalStatus.status;

  // ===== STEP 8: APPLY HEALTH MODIFIERS =====
  const healthPenaltyScore = module4_calculateHealthPenaltyScore(LifeState.sleepHours, LifeState.junkFoodMeals);
  LifeState._computed.healthPenaltyScore = healthPenaltyScore.toFixed(2);

  // ===== STEP 9: PROJECT YEAR-END =====
  const monthlyNet = module8_calculateMonthlyNet(
    LifeState.salary,
    LifeState.fixedCosts,
    monthlyDebtCommitment,
    monthlySocialCost,
    LifeState.dailyBurnAvg,
    passionDeduction,
    LifeState.insurance.premium
  );
  LifeState._computed.monthlyNet = Math.round(monthlyNet);

  const monthsRemaining = Math.ceil((365 - new Date().getDayOfYear()) / 30); // Simplified
  const yearEndProjection = module8_projectYearEnd(LifeState.currentCash, monthlyNet, monthsRemaining);
  LifeState._computed.projectedYearEnd = yearEndProjection.projectedYearEnd;

  // ===== BONUS: UPDATE IMPATIENCE CALCULATOR =====
  const monthlySavingCapacity = Math.max(monthlyNet, 0);
  const impatience = module5_impatienteCalculator(
    LifeState._computed.impatience.dreamItemCost,
    monthlySavingCapacity,
    LifeState._computed.impatience.creditInterestRate,
    24 // Standard 24-month payment plan
  );
  LifeState._computed.impatience = {
    ...LifeState._computed.impatience,
    ...impatience,
  };

  // ===== LOG SUMMARY =====
  console.log("📊 LIFE METRICS UPDATED:");
  console.log(`   Hourly Wage: ¥${hourlyWage.toFixed(0)}/hr`);
  console.log(`   Monthly Debt Commitment: ¥${monthlyDebtCommitment.toFixed(0)}`);
  console.log(`   Debt Freedom in: ${debtFreedomMonths} months`);
  console.log(`   Monthly Social Cost: ¥${monthlySocialCost.toFixed(0)}`);
  console.log(`   Health Penalty: +${(healthPenaltyScore * 100).toFixed(0)}%`);
  console.log(`   Net Available Cash: ¥${netAvailableCash.toFixed(0)}`);
  console.log(`   Survival Index: ${survivalIndex.toFixed(2)} (${survivalStatus.status})`);
  console.log(`   Monthly Net: ¥${monthlyNet.toFixed(0)}`);
  console.log(`   Year-End Projection: ¥${yearEndProjection.projectedYearEnd.toFixed(0)} ${yearEndProjection.trend}`);
  console.log("");

  // Dispatch event for UI updates
  window.dispatchEvent(new CustomEvent("lifeStateUpdated", { detail: LifeState }));

  return LifeState._computed;
}

/**
 * GET FULL REPORT - Export all computed metrics for UI
 */
function getFullReport() {
  return {
    input: {
      salary: LifeState.salary,
      workDays: LifeState.workDays,
      workHours: LifeState.workHours,
      currentCash: LifeState.currentCash,
      fixedCosts: LifeState.fixedCosts,
      dailyBurnAvg: LifeState.dailyBurnAvg,
      daysUntilPayday: LifeState.daysUntilPayday,
      creditCardDebt: LifeState.creditCardDebt,
      minPayRate: LifeState.minPayRate,
      installmentCount: LifeState.installments.length,
      socialEventsPerMonth: LifeState.socialEventsPerMonth,
      faceTaxPerEvent: LifeState.faceTaxPerEvent,
      sleepHours: LifeState.sleepHours,
      junkFoodMeals: LifeState.junkFoodMeals,
      insurancePremium: LifeState.insurance.premium,
      passionFundBudget: LifeState.passionFundBudget,
      savingsTarget: LifeState.savingsTarget,
    },

    module1_timeValue: {
      hourlyWage: Math.round(LifeState._computed.hourlyWage),
      daysOfWorkPer100k: module1_calculateTimeCost(100000, LifeState._computed.hourlyWage).daysRounded,
    },

    module2_debt: module2_getDebtBreakdown(
      LifeState.creditCardDebt,
      LifeState.minPayRate,
      LifeState.installments
    ),

    module3_social: {
      monthlyMonthlySocialCost: LifeState._computed.monthlySocialCost,
      annualSocialCost: module3_getAnnualSocialCost(LifeState.socialEventsPerMonth, LifeState.faceTaxPerEvent),
    },

    module4_health: module4_getHealthStatus(LifeState.sleepHours, LifeState.junkFoodMeals),

    module5_passion: {
      ...module5_getPassionBudgetStatus(LifeState.passionFundBudget, LifeState._computed.monthlyNet),
      impatience: LifeState._computed.impatience,
    },

    module6_accidents: {
      healthPenaltyMultiplier: 1 + parseFloat(LifeState._computed.healthPenaltyScore),
      sampleAccidents: [
        module6_triggerAccident("MINOR_CAR", parseFloat(LifeState._computed.healthPenaltyScore), LifeState.insurance),
        module6_triggerAccident("HOSPITALIZATION", parseFloat(LifeState._computed.healthPenaltyScore), LifeState.insurance),
      ],
    },

    module7_survival: {
      netAvailableCash: LifeState._computed.netAvailableCash,
      dailyBudgetReal: LifeState._computed.dailyBudgetReal,
      survivalIndex: LifeState._computed.survivalIndex,
      survivalStatus: module7_getSurvivalStatus(parseFloat(LifeState._computed.survivalIndex)),
    },

    module8_projection: module8_projectYearEnd(LifeState.currentCash, LifeState._computed.monthlyNet, 11),

    module9_rewards: module9_calculateTreats(Math.max(LifeState._computed.monthlyNet, 0)),

    motivation: module9_getMotivation(
      module7_getSurvivalStatus(parseFloat(LifeState._computed.survivalIndex)),
      LifeState._computed.monthlyNet,
      module4_getHealthStatus(LifeState.sleepHours, LifeState.junkFoodMeals),
      LifeState._computed.debtFreedomDate
    ),
  };
}

/**
 * DEBUG: Log current state
 */
function debugState() {
  console.log("=== CURRENT LIFE STATE ===");
  console.log(LifeState);
  console.log("=== COMPUTED METRICS ===");
  console.log(LifeState._computed);
  console.log("=== FULL REPORT ===");
  console.log(getFullReport());
}

// Initialize on load
window.addEventListener("DOMContentLoaded", () => {
  console.log("✓ Calculator initialized");
  recalculateAll();
});
