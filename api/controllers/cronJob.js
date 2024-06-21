const cron = require("node-cron");
const LeaveType = require("../models/leaveType");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const leaveInterval = require("../enum/leaveInterval");
const renewOption = require("../enum/renewalOption");
const EmployeePositionHistory = require("../models/employeePositionHistory");
const Notifications = require("../models/notification");
const notificationType = require("../enum/notificationType");
const roles = require("../enum/roles");
const moment = require("moment");
const UserOrganization = require("../models/userOrganization");
const EmployeeReviews = require("../models/employeeReviews");
const EmployeeLeaveRew = require("../models/auditLog");
const EmployeeLeaveAdjustment = require("../models/employeeLeaveAdjustment");

function startCron() {
  cron.schedule("0 0 * * *", async () => {
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
function startCronForJobEnd() {
  // Schedule the cron job to run every 15 days
  cron.schedule("0 0 * * *", async () => {
    console.log("Running a task every day at midnight 0 0 * * *");
    const endDateThreshold = moment()
      .add(30, "days")
      .startOf("day")
      .format("YYYY-MM-DD");
    const employeesToNotify = await EmployeePositionHistory.find({
      endDate: endDateThreshold,
      isDeleted: false,
    }).populate({
      path: "employee",
      populate: {
        path: "personalInfo",
      },
    });

    // Iterate over each employee to send notifications
    employeesToNotify.forEach(async (employeePosition) => {
      const employee = employeePosition.employee;

      const employeeOrgRecord = await UserOrganization.findOne({
        user: employeePosition.employee._id,
        isDeleted: false,
        isActive: true,
      });

      if (employeeOrgRecord.organization) {
        const organizationId = employeeOrgRecord.organization;

        // Find UserOrganization records associated with the organization and user role
        const userOrgRecords = await UserOrganization.find({
          organization: organizationId,
          isDeleted: false,
          isActive: true,
        }).populate({
          path: "user",
          match: { role: { $in: [roles.HR, roles.MANAGER, roles.PAYROLL] } },
        });

        // Extract user IDs from UserOrganization records
        const userIds = userOrgRecords?.map((userOrg) => userOrg.user?._id);

        // Construct notification title
        const notificationTitle = `${employee.personalInfo.firstName} ${
          employee.personalInfo.lastName
        } employment is scheduled to end as of ${moment(
          employeePosition.endDate
        ).format("MMM DD yyyy")}.`;

        // Send notification to all HR and managers of the same organization who haven't been notified in the last 15 days
        userIds.forEach(async (userId) => {
          // Create a new notification with dataId set to the user ID
          const notification = new Notifications({
            title: notificationTitle,
            type: notificationType.JOB_END,
            receiver: userId,
            sender: employeePosition.employee._id,
            isRead: false,
            dataId: employee._id,
          });

          // Save the notification to the database
          await notification.save();
        });
      }
    });
  });
}
function startCronForNextReview() {
  // Schedule the cron job to run every 5 days
  cron.schedule("0 0 * * *", async () => {
    console.log("Running a task every mid night  0 0 * * *");

    const nextReviewThreshold = moment()
      .add(10, "days")
      .startOf("day")
      .format("YYYY-MM-DD");

    const employeesToNotify = await EmployeeReviews.find({
      nextReviewDate: nextReviewThreshold, // Find employees whose end date is within the next 10 days
      isDeleted: false,
    }).populate({
      path: "employee",
      populate: {
        path: "personalInfo",
      },
    });
    console.log(
      "employee upcoming review:",
      employeesToNotify,
      nextReviewThreshold
    );

    // Iterate over each employee to send notifications
    employeesToNotify.forEach(async (review) => {
      const employee = review.employee;

      const employeeOrgRecord = await UserOrganization.findOne({
        user: review.employee._id,
        isDeleted: false,
        isActive: true,
      });

      if (employeeOrgRecord.organization) {
        const organizationId = employeeOrgRecord.organization;

        // Find UserOrganization records associated with the organization and user role
        const userOrgRecords = await UserOrganization.find({
          organization: organizationId,
          isDeleted: false,
          isActive: true,
        }).populate({
          path: "user",
          match: { role: { $in: [roles.HR, roles.MANAGER, roles.PAYROLL] } },
        });

        // Extract user IDs from UserOrganization records
        const userIds = userOrgRecords?.map((userOrg) => userOrg.user?._id);

        // Construct notification title
        const notificationTitle = `${employee?.personalInfo?.firstName} ${
          employee?.personalInfo?.lastName
        } has a Performance Review scheduled on ${moment(
          review.nextReviewDate
        ).format("MMM DD YYYY")}.`;

        // Send notification to all HR and managers of the same organization who haven't been notified in the last 15 days
        userIds.forEach(async (userId) => {
          // Create a new notification with dataId set to the user ID
          const notification = new Notifications({
            title: notificationTitle,
            type: notificationType.NEXT_REVIEW,
            receiver: userId,
            sender: employee._id,
            isRead: false,
            dataId: employee._id,
          });
          // console.log("this is the notification:", notification);

          // Save the notification to the database
          await notification.save();
        });
      }
    });
  });
}

function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}
function isRenewalDay(renewalDate) {
  const today = new Date();
  const renewDate = new Date(renewalDate);

  return (
    today.getDate() === renewDate.getDate() &&
    today.getMonth() === renewDate.getMonth()
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
  const allocations = await EmployeeLeaveAllocation.find({
    leaveType: leaveType._id,
    isDeleted: false,
  });

  // Iterate through each allocation and update the balance
  for (const allocation of allocations) {
    // Calculate the new balance based on the smaller of (max carry over) and (old balance)
    const previousBalance = allocation.balance;
    const organization = leaveType.organization;

    const newBalance =
      allocation.totalAllocation +
      Math.min(leaveType.maxCarryOver, allocation.balance);

    // Update the allocation balance with the new balance
    allocation.balance = newBalance;
    allocation.initialBalance = newBalance;

    // Save the updated allocation to the database
    await allocation.save();
    const adjustment = await EmployeeLeaveAdjustment.create({
      employee: allocation.employee,
      leaveType: leaveType._id,
      numberOfHr: Math.min(leaveType.maxCarryOver, allocation.balance), // Number of hours added
      nature: "addition",
      isAdjustedBySystem: true,
    });
    console.log("this is the adjustment entry:", adjustment);

    // await logAudit(
    //   "Leave Allocation Rew",
    //   organization,
    //   allocation.employee,
    //   leaveType._id,
    //   allocation._id,
    //   { balance: previousBalance },
    //   { balance: allocation.balance }
    // );
  }
}
async function logAudit(
  type,
  organization,
  employee,
  leaveType,
  leaveAllocation,
  previousValue,
  currentValue
) {
  const log = new EmployeeLeaveRew({
    type: type,
    organization: organization,
    employee: employee,
    leaveType: leaveType,
    leaveAllocation: leaveAllocation,
    previousValue: previousValue,
    currentValue: currentValue,
  });
  console.log("this is the rew log:", log);

  await log.save();
}

module.exports = {
  startCron,
  logMessage,
  startCronForJobEnd,
  startCronForNextReview,
};
