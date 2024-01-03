const cron = require("node-cron");
const LeaveType = require("../models/leaveType");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const leaveInterval = require("../enum/leaveInterval");
const renewOption = require("../enum/renewalOption");
function startCron() {
  cron.schedule("* * * * *", async () => {
    console.log("Running a task every day at midnight 0 0 * * *");
    // Fetch leave types that need renewal
    const leaveTypesToRenew = await LeaveType.find({
      renew: true,
      isActive: true,
      isDeleted: false,
    });
    logMessage();
    leaveTypesToRenew.forEach(async (leaveType) => {
      if (leaveType.interval === leaveInterval.YEARLY) {
        if (isRenewalDay(leaveType.renewalDate)) {
          await renewLeaveType(leaveType);
        }
      } else if (leaveType.interval === leaveInterval.MONTHLY) {
        if (isRenewalDayOfMonthStart(leaveType.renewalOption)) {
          await renewLeaveType(leaveType);
        }
      }
    });
  });
}

function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}
function isRenewalDay(renewalDate) {
  const today = new Date();
  return (
    today.getDate() === renewalDate.getDate() &&
    today.getMonth() === renewalDate.getMonth()
  );
}
function isLastDayOfMonth(date) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.getDate() === 1;
}

function isRenewalDayOfMonthStart(renewalOption) {
  const today = new Date();
  return (
    (renewalOption === renewOption.BEGINNING && today.getDate() === 1) ||
    (renewalOption === renewOption.END && isLastDayOfMonth(today))
  );
}
async function renewLeaveType(leaveType) {
  console.log(`Renewing leave type: ${leaveType.name}`);
}

module.exports = {
  startCron,
  logMessage,
};
