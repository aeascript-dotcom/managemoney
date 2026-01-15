/**
 * SALARYMAN LIFE SIMULATOR - UI Controller
 * Wires up all input events, real-time calculations, and display updates
 */

// ============ DOM ELEMENT REFERENCES ============
const elements = {
  // Input fields
  salary: document.getElementById("salary"),
  workDays: document.getElementById("workDays"),
  workHours: document.getElementById("workHours"),
  currentCash: document.getElementById("currentCash"),
  fixedCosts: document.getElementById("fixedCosts"),
  dailyBurnAvg: document.getElementById("dailyBurnAvg"),
  daysUntilPayday: document.getElementById("daysUntilPayday"),
  creditCardDebt: document.getElementById("creditCardDebt"),
  minPayRate: document.getElementById("minPayRate"),
  socialEventsPerMonth: document.getElementById("socialEventsPerMonth"),
  faceTaxPerEvent: document.getElementById("faceTaxPerEvent"),
  sleepHours: document.getElementById("sleepHours"),
  junkFoodMeals: document.getElementById("junkFoodMeals"),
  insurancePremium: document.getElementById("insurancePremium"),
  insuranceCoverage: document.getElementById("insuranceCoverage"),
  passionFundBudget: document.getElementById("passionFundBudget"),
  stressLevel: document.getElementById("stressLevel"),
  stressValue: document.getElementById("stressValue"),
  savingsTarget: document.getElementById("savingsTarget"),

  // Installments
  installmentsList: document.getElementById("installmentsList"),
  installmentName: document.getElementById("installmentName"),
  installmentMonthly: document.getElementById("installmentMonthly"),
  installmentMonths: document.getElementById("installmentMonths"),
  addInstallmentBtn: document.getElementById("addInstallmentBtn"),

  // Buttons
  resetBtn: document.getElementById("resetBtn"),

  // Tab navigation
  tabBtns: document.querySelectorAll(".tab-btn"),
  tabContents: document.querySelectorAll(".tab-content"),

  // Output display elements
  // Module 1
  hourlyWage: document.getElementById("hourlyWage"),
  daysOfWork: document.getElementById("daysOfWork"),

  // Module 2
  debtCardTotal: document.getElementById("debtCardTotal"),
  debtCardPayment: document.getElementById("debtCardPayment"),
  installmentTotal: document.getElementById("installmentTotal"),
  monthlyDebtCommitment: document.getElementById("monthlyDebtCommitment"),
  debtFreedomMonths: document.getElementById("debtFreedomMonths"),

  // Module 3
  monthlySocialCost: document.getElementById("monthlySocialCost"),
  annualSocialCost: document.getElementById("annualSocialCost"),

  // Module 4
  healthStatus: document.getElementById("healthStatus"),
  healthPenalty: document.getElementById("healthPenalty"),
  healthNote: document.getElementById("healthNote"),

  // Module 5
  passionBudget: document.getElementById("passionBudget"),
  passionPercent: document.getElementById("passionPercent"),
  passionStatus: document.getElementById("passionStatus"),
  passionNote: document.getElementById("passionNote"),

  // Module 6
  accidentHealthPenalty: document.getElementById("accidentHealthPenalty"),
  accidentButtons: document.getElementById("accidentButtons"),
  accidentResult: document.getElementById("accidentResult"),
  accidentName: document.getElementById("accidentName"),
  accidentBaseCost: document.getElementById("accidentBaseCost"),
  accidentCostAfterHealth: document.getElementById("accidentCostAfterHealth"),
  accidentInsuranceCover: document.getElementById("accidentInsuranceCover"),
  accidentOutOfPocket: document.getElementById("accidentOutOfPocket"),
  accidentSeverity: document.getElementById("accidentSeverity"),

  // Module 7
  survivalIndex: document.getElementById("survivalIndex"),
  survivalStatus: document.getElementById("survivalStatus"),
  survivalExplanation: document.getElementById("survivalExplanation"),
  dailyBudgetReal: document.getElementById("dailyBudgetReal"),
  dailyBurnDisplay: document.getElementById("dailyBurnDisplay"),

  // Module 8
  projCurrentCash: document.getElementById("projCurrentCash"),
  projMonthlyNet: document.getElementById("projMonthlyNet"),
  projMonthsLeft: document.getElementById("projMonthsLeft"),
  projectedYearEnd: document.getElementById("projectedYearEnd"),
  projectionWarning: document.getElementById("projectionWarning"),

  // Flow chart
  flowSalary: document.getElementById("flowSalary"),
  flowFixed: document.getElementById("flowFixed"),
  flowDebt: document.getElementById("flowDebt"),
  flowSocial: document.getElementById("flowSocial"),
  flowBurn: document.getElementById("flowBurn"),
  flowInsurance: document.getElementById("flowInsurance"),
  flowPassion: document.getElementById("flowPassion"),
  monthlyNetAmount: document.getElementById("monthlyNetAmount"),

  // Impatience calculator
  dreamItemCost: document.getElementById("dreamItemCost"),
  creditInterestRate: document.getElementById("creditInterestRate"),
  impatientCostSaved: document.getElementById("impatientCostSaved"),
  impatientWaitTime: document.getElementById("impatientWaitTime"),
  impatientCostCredit: document.getElementById("impatientCostCredit"),
  impatientMonthlyPayment: document.getElementById("impatientMonthlyPayment"),
  impatientStupidityTax: document.getElementById("impatientStupidityTax"),
  impatientStupidityPercent: document.getElementById("impatientStupidityPercent"),
  impatientVerdict: document.getElementById("impatientVerdict"),

  // Motivation
  motivationMessage: document.getElementById("motivationMessage"),

  // Debug
  moduleBreakdown: document.getElementById("moduleBreakdown"),
};

// ============ EVENT LISTENERS ============
function setupEventListeners() {
  // Input changes
  Object.values(elements).forEach((el) => {
    if (el && el.addEventListener) {
      if (el.tagName === "INPUT") {
        el.addEventListener("input", handleInputChange);
      }
    }
  });

  // Tab navigation
  elements.tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Reset button
  elements.resetBtn?.addEventListener("click", () => {
    resetState();
    loadStateToUI();
    recalculateAll();
  });

  // Installments
  elements.addInstallmentBtn?.addEventListener("click", addInstallmentToUI);

  // Impatience calculator inputs
  elements.dreamItemCost?.addEventListener("input", updateImpatience);
  elements.creditInterestRate?.addEventListener("input", updateImpatience);

  // Stress level display
  elements.stressLevel?.addEventListener("input", (e) => {
    elements.stressValue.textContent = e.target.value;
  });

  // Accident simulator buttons
  createAccidentButtons();

  // Listen for state updates
  window.addEventListener("lifeStateUpdated", updateAllUI);

  console.log("✓ Event listeners attached");
}

// ============ INPUT CHANGE HANDLER ============
function handleInputChange(event) {
  const { id, value } = event.target;

  // Handle installment max pay rate
  if (id === "minPayRate") {
    LifeState.minPayRate = Math.min(parseFloat(value) / 100, 1);
  } else {
    // Update state
    updateState(id, value);

    // Handle insurance separately
    if (id === "insurancePremium") {
      LifeState.insurance.premium = parseFloat(value) || 0;
    } else if (id === "insuranceCoverage") {
      LifeState.insurance.coverage = (parseFloat(value) || 0) / 100;
    }
  }

  // Recalculate everything
  recalculateAll();
}

// ============ LOAD STATE TO UI ============
function loadStateToUI() {
  elements.salary.value = LifeState.salary;
  elements.workDays.value = LifeState.workDays;
  elements.workHours.value = LifeState.workHours;
  elements.currentCash.value = LifeState.currentCash;
  elements.fixedCosts.value = LifeState.fixedCosts;
  elements.dailyBurnAvg.value = LifeState.dailyBurnAvg;
  elements.daysUntilPayday.value = LifeState.daysUntilPayday;
  elements.creditCardDebt.value = LifeState.creditCardDebt;
  elements.minPayRate.value = LifeState.minPayRate * 100;
  elements.socialEventsPerMonth.value = LifeState.socialEventsPerMonth;
  elements.faceTaxPerEvent.value = LifeState.faceTaxPerEvent;
  elements.sleepHours.value = LifeState.sleepHours;
  elements.junkFoodMeals.value = LifeState.junkFoodMeals;
  elements.insurancePremium.value = LifeState.insurance.premium;
  elements.insuranceCoverage.value = LifeState.insurance.coverage * 100;
  elements.passionFundBudget.value = LifeState.passionFundBudget;
  elements.stressLevel.value = LifeState.stressLevel;
  elements.stressValue.textContent = LifeState.stressLevel;
  elements.savingsTarget.value = LifeState.savingsTarget;

  // Load installments
  updateInstallmentsDisplay();
}

// ============ UPDATE INSTALLMENTS ============
function addInstallmentToUI() {
  const name = elements.installmentName.value.trim();
  const monthly = parseFloat(elements.installmentMonthly.value) || 0;
  const monthsLeft = parseInt(elements.installmentMonths.value) || 0;

  if (!name || monthly <= 0 || monthsLeft <= 0) {
    alert("Please fill all installment fields correctly");
    return;
  }

  addInstallment(name, monthly, monthsLeft);
  updateInstallmentsDisplay();

  // Clear inputs
  elements.installmentName.value = "";
  elements.installmentMonthly.value = "";
  elements.installmentMonths.value = "";

  recalculateAll();
}

function updateInstallmentsDisplay() {
  elements.installmentsList.innerHTML = "";

  LifeState.installments.forEach((inst, index) => {
    const item = document.createElement("div");
    item.className = "installment-item";
    item.innerHTML = `
      <span class="name">${inst.name}</span>
      <span class="amount">¥${inst.monthly.toLocaleString()}/mo × ${inst.monthsLeft}mo</span>
      <button class="btn-remove" data-index="${index}">Remove</button>
    `;
    elements.installmentsList.appendChild(item);

    item.querySelector(".btn-remove").addEventListener("click", () => {
      removeInstallment(index);
      updateInstallmentsDisplay();
      recalculateAll();
    });
  });
}

// ============ UPDATE UI DISPLAYS ============
function updateAllUI() {
  updateModule1Display();
  updateModule2Display();
  updateModule3Display();
  updateModule4Display();
  updateModule5Display();
  updateModule6Display();
  updateModule7Display();
  updateModule8Display();
  updateFlowChart();
  updateImpatience();
  updateModuleBreakdown();
  updateMotivation();
}

// MODULE 1: TIME VALUE
function updateModule1Display() {
  const hw = LifeState._computed.hourlyWage;
  elements.hourlyWage.textContent = hw.toFixed(0);

  const timeCost = module1_calculateTimeCost(100000, hw);
  elements.daysOfWork.textContent = timeCost.daysRounded;
}

// MODULE 2: DEBT
function updateModule2Display() {
  elements.debtCardTotal.textContent = LifeState.creditCardDebt.toLocaleString();
  elements.debtCardPayment.textContent = (LifeState.creditCardDebt * LifeState.minPayRate).toLocaleString();

  const instTotal = LifeState.installments.reduce((sum, i) => sum + i.monthly, 0);
  elements.installmentTotal.textContent = instTotal.toLocaleString();

  elements.monthlyDebtCommitment.textContent = LifeState._computed.monthlyDebtCommitment.toLocaleString();
  elements.debtFreedomMonths.textContent = LifeState._computed.debtFreedomDate;
}

// MODULE 3: SOCIAL
function updateModule3Display() {
  const monthlySocial = LifeState._computed.monthlySocialCost;
  elements.monthlySocialCost.textContent = monthlySocial.toLocaleString();

  const annualSocial = monthlySocial * 12;
  elements.annualSocialCost.textContent = annualSocial.toLocaleString();
}

// MODULE 4: HEALTH
function updateModule4Display() {
  const healthStatus = module4_getHealthStatus(LifeState.sleepHours, LifeState.junkFoodMeals);
  elements.healthStatus.textContent = `${healthStatus.emoji} ${healthStatus.status}`;
  elements.healthPenalty.textContent = `+${(parseFloat(LifeState._computed.healthPenaltyScore) * 100).toFixed(0)}%`;
  elements.healthNote.textContent = `Your sleep (${LifeState.sleepHours}h) and diet (${LifeState.junkFoodMeals} junk meals/week) affect your risk multiplier.`;
}

// MODULE 5: PASSION
function updateModule5Display() {
  elements.passionBudget.textContent = LifeState.passionFundBudget.toLocaleString();

  const passion = module5_getPassionBudgetStatus(LifeState.passionFundBudget, LifeState._computed.monthlyNet);
  elements.passionPercent.textContent = passion.percentOfMonthlyNet;
  elements.passionStatus.textContent = passion.status;
  elements.passionNote.textContent = passion.message;
}

// MODULE 6: ACCIDENTS
function updateModule6Display() {
  const healthPenalty = parseFloat(LifeState._computed.healthPenaltyScore);
  elements.accidentHealthPenalty.textContent = `×${(1 + healthPenalty).toFixed(2)}`;
}

function createAccidentButtons() {
  const types = module6_getAccidentTypes();
  elements.accidentButtons.innerHTML = "";

  types.forEach((type) => {
    const btn = document.createElement("button");
    btn.className = "accident-btn";
    btn.textContent = type.name;
    btn.addEventListener("click", () => simulateAccident(type.id));
    elements.accidentButtons.appendChild(btn);
  });
}

function simulateAccident(accidentType) {
  const healthPenalty = parseFloat(LifeState._computed.healthPenaltyScore);
  const result = module6_triggerAccident(accidentType, healthPenalty, LifeState.insurance);

  elements.accidentName.textContent = result.accidentType;
  elements.accidentBaseCost.textContent = result.baseCost.toLocaleString();
  elements.accidentCostAfterHealth.textContent = result.costAfterHealth.toLocaleString();
  elements.accidentInsuranceCover.textContent = result.insuredAmount.toLocaleString();
  elements.accidentOutOfPocket.textContent = result.outOfPocketCost.toLocaleString();
  elements.accidentSeverity.textContent = `${result.severity} - This accident would ${result.outOfPocketCost > LifeState.currentCash ? "BANKRUPT" : "hurt"} you.`;

  elements.accidentResult.classList.remove("hidden");
}

// MODULE 7: SURVIVAL
function updateModule7Display() {
  const survivalIndex = parseFloat(LifeState._computed.survivalIndex);
  elements.survivalIndex.textContent = survivalIndex.toFixed(2);

  const survivalStatus = module7_getSurvivalStatus(survivalIndex);
  const statusBadge = elements.survivalStatus;
  statusBadge.textContent = survivalStatus.status;
  statusBadge.className = `status-badge ${survivalStatus.color.toLowerCase()}`;

  elements.survivalExplanation.textContent = survivalStatus.message;

  elements.dailyBudgetReal.textContent = LifeState._computed.dailyBudgetReal.toLocaleString();
  elements.dailyBurnDisplay.textContent = LifeState.dailyBurnAvg.toLocaleString();
}

// MODULE 8: PROJECTION
function updateModule8Display() {
  elements.projCurrentCash.textContent = LifeState.currentCash.toLocaleString();
  elements.projMonthlyNet.textContent = LifeState._computed.monthlyNet.toLocaleString();
  elements.projMonthsLeft.textContent = "11";

  const projection = module8_projectYearEnd(LifeState.currentCash, LifeState._computed.monthlyNet, 11);
  elements.projectedYearEnd.textContent = `${projection.trend} ¥${Math.abs(projection.projectedYearEnd).toLocaleString()}`;
  elements.projectionWarning.textContent = projection.warning;

  // Color coding
  if (projection.projectedYearEnd < 0) {
    elements.projectedYearEnd.style.color = "var(--color-danger)";
  } else if (projection.projectedYearEnd < 100000) {
    elements.projectedYearEnd.style.color = "var(--color-warning)";
  } else {
    elements.projectedYearEnd.style.color = "var(--color-success)";
  }
}

// FLOW CHART
function updateFlowChart() {
  const salary = LifeState.salary;
  const fixed = LifeState.fixedCosts;
  const debt = LifeState._computed.monthlyDebtCommitment;
  const social = LifeState._computed.monthlySocialCost;
  const burn = LifeState.dailyBurnAvg * 30;
  const insurance = LifeState.insurance.premium;
  const passion = LifeState.passionFundBudget;

  elements.flowSalary.textContent = salary.toLocaleString();
  elements.flowFixed.textContent = fixed.toLocaleString();
  elements.flowDebt.textContent = debt.toLocaleString();
  elements.flowSocial.textContent = social.toLocaleString();
  elements.flowBurn.textContent = burn.toLocaleString();
  elements.flowInsurance.textContent = insurance.toLocaleString();
  elements.flowPassion.textContent = passion.toLocaleString();

  const net = LifeState._computed.monthlyNet;
  elements.monthlyNetAmount.textContent = `¥${net.toLocaleString()}`;

  // Color code the result
  if (net < 0) {
    elements.monthlyNetAmount.style.color = "var(--color-danger)";
  } else if (net < 50000) {
    elements.monthlyNetAmount.style.color = "var(--color-warning)";
  } else {
    elements.monthlyNetAmount.style.color = "var(--color-success)";
  }
}

// IMPATIENCE CALCULATOR
function updateImpatience() {
  const dreamCost = parseFloat(elements.dreamItemCost.value) || 5000;
  const interestRate = (parseFloat(elements.creditInterestRate.value) || 1.33) / 100;
  const monthlySavingCapacity = Math.max(LifeState._computed.monthlyNet, 0);

  const impatience = module5_impatienteCalculator(dreamCost, monthlySavingCapacity, interestRate, 24);

  elements.impatientCostSaved.textContent = impatience.costIfSaved.toLocaleString();
  elements.impatientWaitTime.textContent = impatience.timeToWaitMonths;
  elements.impatientCostCredit.textContent = impatience.costIfCredit.toLocaleString();
  elements.impatientMonthlyPayment.textContent = (impatience.costIfCredit / 24).toLocaleString();
  elements.impatientStupidityTax.textContent = impatience.stupidityTax.toLocaleString();
  elements.impatientStupidityPercent.textContent = impatience.stupidityTaxPercent;
  elements.impatientVerdict.textContent = impatience.verdict;
}

// MODULE BREAKDOWN
function updateModuleBreakdown() {
  const report = getFullReport();
  elements.moduleBreakdown.textContent = JSON.stringify(report, null, 2);
}

// MOTIVATION
function updateMotivation() {
  const survivalStatus = module7_getSurvivalStatus(parseFloat(LifeState._computed.survivalIndex));
  const healthStatus = module4_getHealthStatus(LifeState.sleepHours, LifeState.junkFoodMeals);
  const motivation = module9_getMotivation(survivalStatus, LifeState._computed.monthlyNet, healthStatus, LifeState._computed.debtFreedomDate);
  elements.motivationMessage.textContent = motivation;
}

// ============ TAB NAVIGATION ============
function switchTab(tabName) {
  // Hide all tabs
  elements.tabContents.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Deactivate all buttons
  elements.tabBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Activate selected button
  event.target.classList.add("active");
}

// ============ INITIALIZATION ============
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎮 Salaryman Life Simulator Initializing...");

  // Load initial state to UI
  loadStateToUI();

  // Setup all event listeners
  setupEventListeners();

  // Initial calculations
  recalculateAll();

  console.log("✓ Simulator Ready!");
  console.log("📊 Try changing values to see real-time calculations");
});

// ============ DEBUG ============
window.debugSimulator = () => {
  console.log("=== SIMULATOR DEBUG ===");
  debugState();
  console.log("=== END DEBUG ===");
};

console.log("💰 Type 'debugSimulator()' in console for full debug info");
