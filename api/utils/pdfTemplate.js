const moment = require("moment/moment");
const { JSDOM } = require("jsdom");

const templates = {
  formatNumber: (number) => {
    if (!number) return "";
    let formattedNumber = `(${number.substring(0, 3)}) ${number.substring(
      3,
      6
    )}-${number.substring(6, 10)}`;
    return formattedNumber;
  },

  jobApplicants: async (jobDetails, applicants) => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        font-family: "Inter", sans-serif;
        box-sizing: border-box;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        box-sizing: border-box;
      }

      th,
      td {
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background: #f6f6f6;
        color: #93959a;
        font-size: 8px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
      }
      td {
        color: #93959a;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
      tr {
        border-bottom: 1px solid #e4e4e4;
      }

      /* tr:first-child {
        border: none;
      } */
    </style>
  </head>
  <body>
    <div style="width: 100%; background-color: #686868; padding: 16px 0px 21px 42px">
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          margin-bottom: 14px;
        "
      >
        <p
          style="
            color: #AFAFAF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
          "
        >
          Job Title
        </p>
        <p
          style="
            color: #FFFFFF;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            margin: 0;
          "
        >
         ${jobDetails?.title}
        </p>
      </div>
      <div style="display: flex; align-items: center">
        <div
          style="width: 50%; display: flex; flex-direction: column; gap: 8px"
        >
          <p
            style="
              color: #AFAFAF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              margin: 0;
            "
          >
            Department:
          </p>
          <p
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 24px;
              margin: 0;
            "
          >
           ${jobDetails?.department?.name}
          </p>
        </div>
        <div
          style="width: 50%; display: flex; flex-direction: column; gap: 8px"
        >
          <p
            style="
              color: #AFAFAF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              margin: 0;
            "
          >
            Board Members:
          </p>
          <p
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 24px;
              margin: 0;
            "
          >
         ${jobDetails?.boardMembers}

          </p>
        </div>
      </div>
    </div>
    <div
      style="
        width: 100%;
        background-color: #686868;
        padding: 19px 0px 19px 42px;
        gap: 12px;
        border-top: 1px solid #E6E6E6;
        display: flex;
        align-items: center;
      "
    >
      <div style="width: 50%">
        <p
          style="
            color: #FFFFFF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
          "
        >
          Posting Date:
          <span
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 700;
              line-height: 16px;
              margin: 0;
            "
          >
           ${moment.utc(jobDetails?.postingDate || "").format("MMM DD yyyy")}
          </span>
        </p>
      </div>
      <div style="width: 50%">
        <p
          style="
            color: #FFFFFF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
          "
        >
          Closing Date:
          <span
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 700;
              line-height: 16px;
              margin: 0;
            "
          >
             ${moment.utc(jobDetails?.closingDate || "").format("MMM DD yyyy")}
          </span>
        </p>
      </div>
    </div>
    <div
      style="
        background-color: #FFFFFF;
        width: 100%;
        padding: 11px 24px 50px 24px;
        display: flex;
        flex-direction: column;
        margin: 0;
      "
    >
      <p
        style="
          color: #222b45;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
          margin: 8px 0px;
          width: 100%;
        "
      >
        Applicants
      </p>
      <table style="width: 100%">
        <thead>
          <tr>
            <th>Sr.no.</th>
            <th>Name</th>
            <th>Applied On</th>
            <th>Meets Eligibility</th>
            <th>Interview Date</th>
            <th>Interviewed</th>
            <th>Selected</th>
          </tr>
        </thead>
        <tbody>
        ${applicants.map(
          (data, index) => `
         <tr>
            <td>${index + 1}</td>
            <td
              style="
                color: #222b45;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
              "
            >
            ${data?.name}
            </td>
            <td>   ${
              data?.appliedOn
                ? moment.utc(data?.appliedOn).format("MMM DD yyyy")
                : " - "
            }</td>
            <td>${data.isEligibile ? "Yes" : "No"} </td>
            <td>  ${
              data?.interviewDate
                ? moment.utc(data?.interviewDate).format("MMM DD yyyy")
                : " - "
            }</td>
              <td>${data.interviewed ? data.interviewed : " - "} </td>
              <td>${data.isSelected ? "Yes" : "No"} </td>
          </tr>
        
        `
        )}
        </tbody>
      </table>
    </div>
  </body>
</html>`;
  },
  leaveReports: async (leaves, LeaveDetails) => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        font-family: "Inter", sans-serif;
        box-sizing: border-box;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        box-sizing: border-box;
      }

      th,
      td {
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background-color: #f6f6f6;
        color: #93959a;
        font-size: 8px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
      }
      td {
        color: #93959a;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
      tr {
        border-bottom: 1px solid #e4e4e4;
      }

      /* tr:first-child {
        border: none;
      } */
    </style>
  </head>
  <body>
    <div style="width: 100%; background-color: #F9F9F9; padding: 16px 0px 21px 42px">
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          margin-bottom: 14px;
        "
      >
        <p
          style="
            color: #AFAFAF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
          "
        >
          Report 
        </p>
        <p
          style="
            color: #FFFFFF;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            margin: 0;
          "
        >
         Leaves Report
        </p>
      </div>
      <div style="display: flex; align-items: center">
        <div
          style="width: 50%; display: flex; flex-direction: column; gap: 8px"
        >
          <p
            style="
              color: #AFAFAF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              margin: 0;
            "
          >
            Department:
          </p>
          <p
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 24px;
              margin: 0;
            "
          >
           ${LeaveDetails?.department ? LeaveDetails?.department : " - "}
          </p>
        </div>
        <div
          style="width: 50%; display: flex; flex-direction: column; gap: 8px"
        >
          <p
            style="
              color: #AFAFAF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              margin: 0;
            "
          >
            Leave Type :
          </p>
          <p
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 24px;
              margin: 0;
            "
          >
         ${LeaveDetails?.leaveType ? LeaveDetails?.leaveType : "-"}

          </p>
        </div>
      </div>
    </div>
    <div
      style="
        width: 100%;
        background-color: #F9F9F9;
        padding: 19px 0px 19px 42px;
        gap: 12px;
        border-top: 1px solid #E6E6E6;
        display: flex;
        align-items: center;
      "
    >
      <div style="width: 50%">
        <p
          style="
            color: #FFFFFF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
          "
        >
          Start Date:
          <span
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 700;
              line-height: 16px;
              margin: 0;
            "
          >
           ${
             LeaveDetails?.startDate
               ? moment.utc(LeaveDetails?.startDate || "").format("MMM DD yyyy")
               : " - "
           }
          </span>
        </p>
      </div>
      <div style="width: 50%">
        <p
          style="
            color: #FFFFFF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
          "
        >
          End Date:
          <span
            style="
              color: #FFFFFF;
              font-size: 12px;
              font-style: normal;
              font-weight: 700;
              line-height: 16px;
              margin: 0;
            "
          >
             ${
               LeaveDetails?.endDate
                 ? moment.utc(LeaveDetails?.endDate || "").format("MMM DD yyyy")
                 : " - "
             }
          </span>
        </p>
      </div>
    </div>
    <div
      style="
        background-color: #FFFFFF;
        width: 100%;
        padding: 11px 24px 50px 24px;
        display: flex;
        flex-direction: column;
        margin: 0;
      "
    >
      <p
        style="
          color: #222b45;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
          margin: 8px 0px;
          width: 100%;
        "
      >
        Leave Report
      </p>
      <table style="width: 100%">
        <thead>
          <tr>
            <th>Sr.no.</th>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Hours</th>

            <th>Department</th>
        
          </tr>
        </thead>
        <tbody>
        ${leaves.map(
          (data, index) => `
         <tr>
            <td>${index + 1}</td>
            <td
              style="
                color: #222b45;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
              "
            >
            ${
              data?.personalInfo
                ? [
                    data?.personalInfo?.firstName,
                    data?.personalInfo?.lastName,
                  ].join(" ")
                : " - "
            }
            </td>
            <td>
            ${data?.leaveType?.name}
            </td>
            
            <td>   ${
              data?.from ? moment.utc(data?.from).format("MMM DD yyyy") : " - "
            }</td>
            <td>  ${
              data?.to ? moment.utc(data?.to).format("MMM DD yyyy") : " - "
            }</td>
             <td>
            ${data?.hours}
            </td>
              
              <td>${data?.departmentsData?.name} </td>
          </tr>
        
        `
        )}
        </tbody>
      </table>
    </div>
  </body>
</html>`;
  },
  bebEligibleReports: async (employees) => {
    return `<!DOCTYPE html>
<html lang="en"> 
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        font-family: "Inter", sans-serif;
        box-sizing: border-box;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        box-sizing: border-box;
      }

      th,
      td {
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background-color: #f6f6f6;
        color: #93959a;
        font-size: 8px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
      }
      td {
        color: #93959a;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
      tr {
        border-bottom: 1px solid #e4e4e4;
      }

      /* tr:first-child {
        border: none;
      } */
    </style>
  </head>
  <body>
    <div style="width: 100%; background-color: #F9F9F9; padding: 16px 0px 21px 42px">
       <div
        style="
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          margin-bottom: 14px;
        "
      >
        <p
          style="
            color: #AFAFAF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;
            margin: 0;
          "
        >
          Report 
        </p>
        <p
          style="
            color: #FFFFFF;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            margin: 0;
          "
        >
         BEB Eligible Report
        </p>
      </div>
      
    </div>
   
    <div
      style="
        background-color: #FFFFFF;
        width: 100%;
        padding: 11px 24px 50px 24px;
        display: flex;
        flex-direction: column;
        margin: 0;
      "
    >
      <table style="width: 100%">
        <thead>
          <tr>
            <th>Sr.no.</th>
            <th>Name</th>
            <th>Employee Id</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
        ${employees.map(
          (data, index) => `<tr>
            <td>${index + 1}</td>
            <td
              style="
                color: #222b45;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
              "
            >
            ${
              data?.personalInfo
                ? [
                    data?.personalInfo?.firstName,
                    data?.personalInfo?.lastName,
                  ].join(" ")
                : " - "
            }
            </td>
            <td>
            ${data?.personalInfo?.employeeId}
            </td>
            <td>   ${data?.personalInfo?.homePhone} </td>
            <td> ${
              (data.role === "EMPLOYEE"
                ? "USER"
                : data.role === "HR"
                ? " HR"
                : data.role) || " - "
            }</td>
              
              <td>${data?.departmentInfo?.name} </td>
          </tr>`
        )}
        </tbody>
      </table>
    </div>
  </body>
</html>`;
  },
};

function addLeadingZeros(value, length = 4) {
  if (value) {
    let result = value.toString();
    while (result.length < length) {
      result = "0" + result;
    }
    return result;
  }
  return value;
}
module.exports = templates;
