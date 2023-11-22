const moment = require("moment/moment");

const emailTemplates = {
  invite(data) {
    return {
      subject: "Wagmatcook | Invitation to Sign Up",
      html: `<!DOCTYPE html>
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
                    }
                
                    table,
                    td {
                      mso-table-lspace: 0px !important;
                      mso-table-rspace: 0px !important;
                    }
                
                    table {
                      border-spacing: 0 !important;
                      border-collapse: collapse !important;
                      table-layout: fixed !important;
                      margin: 0 auto !important;
                    }
                
                    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                      u~div .email-container {
                        min-width: 320px !important;
                      }
                    }
                
                    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                      u~div .email-container {
                        min-width: 375px !important;
                      }
                    }
                
                    @media only screen and (min-device-width: 414px) {
                      u~div .email-container {
                        min-width: 414px !important;
                      }
                    }
                  </style>
                </head>
                
                <body>
                  <center style="width: 100%">
                    <div style="max-width: 700px; margin: 0 auto" class="email-container">
                      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                        style="margin: auto">
                        <tr>
                          <td valign="top">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                              style="background: #093fe1">
                              <tr>
                                <td style="text-align: left; padding: 36px 50px 0px 50px">
                                  <p style="
                                        color: #fff;
                                        font-family: 'Inter', sans-serif;
                                        font-size: 24px;
                                        font-style: normal;
                                        font-weight: 700;
                                        line-height: normal;
                                        letter-spacing: -0.48px;
                                        width: 100%;
                                      ">
                                    Your Community Portal
                                  </p>
                
                                </td>
                              <tr>
                                <td align="center">
                                  <img src="https://hrapi.chantsit.com/public/invitation.png" />
                
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p style="
                              color: #fff;
                              text-align: center;
                              font-family: 'Inter', sans-serif;
                              font-size: 32px;
                              font-style: normal;
                              font-weight: 700;
                              line-height: 48px; /* 150% */
                              letter-spacing: -0.64px;
                              width: 80%;
                              margin: 20px auto;
                            ">
                                    Join your team on our Community Portal
                                  </p>
                                </td>
                              </tr>
                        </tr>
                
                
                      </table>
                
                      </td>
                      </tr>
                      <tr>
                        <td align="left" >
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                                <h1 style="
                                width: 100%;
                                color: #222b45;
                                font-family: 'Inter', sans-serif;
                                font-size: 18px;
                                font-style: normal;
                                font-weight: 700;
                                line-height: 32px;
                                margin: 0;
                              ">
                              Hi ${
                                data.user.name ||
                                data.user.personalInfo?.firstName ||
                                data.user.email ||
                                ""
                              }
                                </h1>
                                <p style="
                                color: #222b45;
                                font-family: 'Inter', sans-serif;
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 28px;
                              ">
                                  Welcome to the community Portal! We are pleased to have you join
                                  us in building a stronger community, greater transparency and
                                  enhanced accountability.
                                </p>
                 <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style=" border-radius: 8px;
                                background: #bde0e6;
                               ">
                                <tr>
                                  <td style="width: 30%;  padding: 20px 0px;
                                margin: 20px 0px 40px 0px;">
                                    <img src="https://hrapi.chantsit.com/public/imagefile.png" />
                                  </td>
                                  <td style="width: 70%;  padding: 20px 20px;
                                margin: 20px 20px 40px 0px;">
                                    <p style="
                                    color: #222b45;
                                    font-family: 'Inter', sans-serif;
                                    font-size: 16px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 28px;
                                  ">
                                      Wagmatcook Admin has invited you to use Wagmatcook
                                    </p>
                                    <a style="
                                    border-radius: 8px;
                                    background: #fff;
                                    color: #050505;
                                       display: inline-block;
                                      cursor: pointer;
                                      text-decoration: none;
                                    text-align: center;
                                    font-family: 'Inter', sans-serif;
                                    font-size: 16px;
                                    font-style: normal;
                                    font-weight: 600;
                                    line-height: 16px;
                                    padding: 0.8em 1.25em;
                                    border: none;
                                  " href="${
                                    process.env.FRONTEND_URL
                                  }organization-admin/complete-signup/${
        data.user.email
      }/${data.user.invitationToken}"
                                     target="_blank">
                                    Join Now
                                    </a>
                                  </td>
                                </tr>
                
                              </table>
                
                
                
                
                              </td>
                             
                
                
                
                          </table>
                          <table class="body-sub" role="presentation">
                          <tr>
                              <td style=" padding: 20px 50px 0px 50px;">
                                  <p class="f-fallback sub">If you’re having trouble with the
                                      button above, copy and paste the URL below into your web
                                      browser.</p>
                                  <p class="f-fallback sub">
                                      ${
                                        process.env.FRONTEND_URL
                                      }organization-admin/complete-signup/${
        data.user.email
      }/${data.user.invitationToken}
                                  </p>
                              </td>
                          </tr>
                      </table>
                
                        </td>
                      </tr>
                      </table>
                      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="left" style="
                                width: 100%;
                                color: #222b45;
                                font-family: 'Inter', sans-serif;
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 500;
                                line-height: 24px;
                                margin-bottom: 90px;
                                padding: 60px 50px 40px 50px;
                              ">
                            <p style="margin: 0px">Best regards,</p>
                            <p style="margin: 0px">The Wagmatcook Team</p>
                            <p style="margin: 0px">www.wagmatcook.com</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </center>
                </body>
                
                </html>
                
           `,
    };
  },
  sendOtp(data) {
    return {
      subject: "Wagmatcook | One Time Password",
      html: `

                <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: "Inter", sans-serif;
    }

    table,
    td {
      mso-table-lspace: 0px !important;
      mso-table-rspace: 0px !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>
</head>

<body>
  <center style="width: 100%">
    <div style="max-width: 700px; margin: 0 auto" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto">
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
              style="background: #093fe1">
              <tr>
                <td style="text-align: left; padding: 36px 50px 0px 50px">
                  <p style="
                        color: #fff;
                        font-family: 'Inter', sans-serif;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: -0.48px;
                        width: 100%;
                      ">
                    Your Community Portal
                  </p>
                </td>
              <tr>
                <td align="center">
                  <img src="https://hrapi.chantsit.com/public/otp.png" />
                </td>
              </tr>
              <tr>
                <td>
                  <p style="
              color: #fff;
              text-align: center;
              font-family: 'Inter', sans-serif;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 48px; /* 150% */
              letter-spacing: -0.64px;
              width: 80%;
              margin: 20px auto;
            ">
                    OTP Verification
                  </p>
                </td>
              </tr>
        </tr>
      </table>
      </td>
      </tr>
      <tr>
        <td align="left" style="padding: 40px 50px 0px 50px">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                <h1 style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
              ">
                  Hi ${
                    data.req.user.name ||
                    data.req.user.personalInfo?.firstName ||
                    data.req.user.email ||
                    ""
                  }
                </h1>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Please use the verification code below to access your Wagmatcook
                  account
                </p>

                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 30px;
                font-style: normal;
                font-weight: 500;
                line-height: 60px;
                margin: 20px 0px;
              ">
              ${data.token}
                </p>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  If you didn't request this, or if you have any concerns about your
                  account's security, please contact our support team immediately at
                  <span style="text-decoration-line: underline">
                    security@wagmatcook.com.
                  </span>
                </p>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Your account security is important to us. Thank you for being part
                  of the Wagmatcook community.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      </table>
      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="left" style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 90px;
                padding: 60px 50px 40px 50px;
              ">
            <p style="margin: 0px">Best regards,</p>
            <p style="margin: 0px">The Wagmatcook Team</p>
            <p style="margin: 0px">www.wagmatcook.com</p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>

</html>
                
            `,
    };
  },
  welcome(data) {
    return {
      subject: "Wagmatcook | Welcome",
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>welcome</title>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
            body {
              margin: 0 auto !important;
              padding: 0 !important;
              height: 100% !important;
              width: 100% !important;
              font-family: "Inter", sans-serif;
            }
            table,
            td {
              mso-table-lspace: 0px !important;
              mso-table-rspace: 0px !important;
            }
            table {
              border-spacing: 0 !important;
              border-collapse: collapse !important;
              table-layout: fixed !important;
              margin: 0 auto !important;
            }
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
              u ~ div .email-container {
                min-width: 320px !important;
              }
      
            }
      
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
              u ~ div .email-container {
                min-width: 375px !important;
              }
            }
      
            @media only screen and (min-device-width: 414px) {
              u ~ div .email-container {
                min-width: 414px !important;
              }
            }
          </style>
        </head>
      
        <body>
          <center style="width: 100%">
            <div style="max-width: 700px; margin: 0 auto" class="email-container">
              <table
                align="center"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                width="100%"
                style="margin: auto"
              >
                <tr>
                  <td valign="top">
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="background: #093fe1"
                    >
                      <tr>
                        <td style="text-align: left; padding: 36px 50px 0px 50px">
                          <p
                            style="
                              color: #fff;
                              font-family: 'Inter', sans-serif;
                              font-size: 24px;
                              font-style: normal;
                              font-weight: 700;
                              line-height: normal;
                              letter-spacing: -0.48px;
                              width: 100%;
                            "
                          >
                            Your Community Portal
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p
                            style="
                              color: #fff;
                              text-align: center;
                              font-family: 'Inter', sans-serif;
                              font-size: 32px;
                              font-style: normal;
                              font-weight: 700;
                              line-height: 48px; /* 150% */
                              letter-spacing: -0.64px;
                              width: 80%;
                              margin: 10px auto;
                            "
                          >
                            Welcome to the Wagmatcook HR Portal
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <img
                            src="https://hrapi.chantsit.com/public/welcome.png"
                            style="width: 284px; height: 263px"
                          />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" style="padding: 40px 50px 0px 50px">
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                    >
                      <tr>
                        <td style="text-align: left">
                          <h1
                            style="
                              color: #222b45;
                              font-family: 'Inter', sans-serif;
                              font-size: 18px;
                              font-style: normal;
                              font-weight: 700;
                              line-height: 32px;
                            "
                          >
                            Hi ${data.user.personalInfo?.firstName || ""}
                          </h1>
                          <p
                            style="
                              color: #222b45;
                              font-family: 'Inter', sans-serif;
                              font-size: 16px;
                              font-style: normal;
                              font-weight: 400;
                              line-height: 28px;
                            "
                          >
                            Welcome to the Wagmatcook HR Portal. This is your source
                            for all your employment related information such as job
                            details, leave requests and balances, announcements and
                            more.
                          </p>
                          <p
                            style="
                              color: #222b45;
                              font-family: 'Inter', sans-serif;
                              font-size: 16px;
                              font-style: normal;
                              font-weight: 400;
                              line-height: 28px;
                            "
                          >
                            Here's whats included:
                          </p>
                          <table
                            role="presentation"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                          >
                            <tr>
                              <td valign="top" width="50%">
                                <table
                                  role="presentation"
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr style="padding-bottom: 15px">
                                    <td align="left" style="width: 100%">
                                      <center
                                        style="
                                          width: 49px;
                                          height: 49px;
                                          background-color: #eef2ff;
                                          border-radius: 50%;
                                        "
                                      >
                                        <img
                                          src="https://hrapi.chantsit.com/public/heart.png"
                                          style="margin: 11px"
                                        />
                                      </center>
                                      <h2
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 700;
                                          line-height: 28px;
                                          margin: 0px;
                                          align-items: center;
                                        "
                                      >
                                        Access to your employment details
                                      </h2>
                                      <p
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 400;
                                          line-height: 28px;
                                          margin: 0;
                                        "
                                      >
                                        Instantly view your employment details and
                                        related files
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td width="20px"></td>
                              <td valign="top" width="50%">
                                <table
                                  role="presentation"
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr style="padding-bottom: 15px">
                                    <td align="left" style="width: 100%">
                                      <center
                                        style="
                                          width: 49px;
                                          height: 49px;
                                          background-color: #eef2ff;
                                          border-radius: 50%;
                                        "
                                      >
                                        <img
                                          src="https://hrapi.chantsit.com/public/add.png"
                                          style="margin: 11px"
                                        />
                                      </center>
                                      <h2
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 700;
                                          line-height: 28px;
                                          margin: 0px;
                                          align-items: center;
                                        "
                                      >
                                        Leave Management
                                      </h2>
                                      <p
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 400;
                                          line-height: 28px;
                                          margin: 0;
                                        "
                                      >
                                        View your leave balances and submit leave
                                        requests directly through the portal.
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr style="height: 20px"></tr>
                            <tr>
                              <td valign="top" width="50%">
                                <table
                                  role="presentation"
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr>
                                    <td align="left" style="width: 100%">
                                      <center
                                        style="
                                          width: 49px;
                                          height: 49px;
                                          background-color: #eef2ff;
                                          border-radius: 50%;
                                        "
                                      >
                                        <img
                                          src="https://hrapi.chantsit.com/public/video.png"
                                          style="margin: 11px"
                                        />
                                      </center>
                                      <h2
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 700;
                                          line-height: 28px;
                                          margin: 0px;
                                          align-items: center;
                                        "
                                      >
                                        Organization Documents
                                      </h2>
                                      <p
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 400;
                                          line-height: 28px;
                                          margin: 0;
                                        "
                                      >
                                        Quick access to organizational policies,
                                        procedures and other important information.
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td width="20px"></td>
                              <td valign="top" width="50%">
                                <table
                                  role="presentation"
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr>
                                    <td align="left" style="width: 100%">
                                      <center
                                        style="
                                          width: 49px;
                                          height: 49px;
                                          background-color: #eef2ff;
                                          border-radius: 50%;
                                        "
                                      >
                                        <img
                                          src="https://hrapi.chantsit.com/public/chart.png"
                                          style="margin: 11px"
                                        />
                                      </center>
                                      <h2
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 700;
                                          line-height: 28px;
                                          margin: 0px;
                                          align-items: center;
                                        "
                                      >
                                        Announcements
                                      </h2>
                                      <p
                                        style="
                                          color: #222b45;
                                          font-family: 'Inter', sans-serif;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: 400;
                                          line-height: 28px;
                                          margin: 0;
                                        "
                                      >
                                        Stay up to date with work related
                                        announcements and other informaiton.
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                class="bg_white"
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td
                    align="left"
                    style="
                      width: 100%;
                      color: #222b45;
                      font-family: 'Inter', sans-serif;
                      font-size: 14px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: 24px;
                    
                      padding: 60px 50px 40px 50px;
                    "
                  >
                    <p style="margin: 0px">Best regards,</p>
                    <p style="margin: 0px">The Wagmatcook Team</p>
                    <p style="margin: 0px">www.wagmatcook.com</p>
                  </td>
                </tr>
              </table>
            
            </div>
          </center>
        </body>
      </html>
      `,
    };
  },
  announcement(data) {
    return {
      subject: "Wagmatcook | Announcement",
      html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
      
          body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            font-family: "Inter", sans-serif;
          }
      
          table,
          td {
            mso-table-lspace: 0px !important;
            mso-table-rspace: 0px !important;
          }
      
          table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
          }
      
          @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u~div .email-container {
              min-width: 320px !important;
            }
          }
      
          @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u~div .email-container {
              min-width: 375px !important;
            }
          }
      
          @media only screen and (min-device-width: 414px) {
            u~div .email-container {
              min-width: 414px !important;
            }
          }
        </style>
      </head>
      
      <body>
        <center style="width: 100%">
          <div style="max-width: 700px; margin: 0 auto" class="email-container">
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
              style="margin: auto">
              <tr>
                <td valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="background: #093fe1">
                    <tr>
                      <td style="text-align: left; padding: 36px 50px 0px 50px">
                        <p style="
                              color: #fff;
                              font-family: 'Inter', sans-serif;
                              font-size: 24px;
                              font-style: normal;
                              font-weight: 700;
                              line-height: normal;
                              letter-spacing: -0.48px;
                              width: 100%;
                            ">
                          Your Community Portal
                        </p>
                      </td>
                    <tr>
                      <td align="center">
                        <img src="https://hrapi.chantsit.com/public/events.png" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style="
                    color: #fff;
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                    font-size: 32px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 48px; /* 150% */
                    letter-spacing: -0.64px;
                    width: 80%;
                    margin: 20px auto;
                  ">
                          Save the Date for Our Upcoming Company Event!
                        </p>
                      </td>
                    </tr>
              </tr>
            </table>
            </td>
            </tr>
            <tr>
              <td align="left" style="padding: 40px 50px 0px 50px">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="text-align: left; padding: 40px 50px 0px 50px;">
                      <h1 style="
                      width: 100%;
                      color: #222b45;
                      font-family: 'Inter', sans-serif;
                      font-size: 18px;
                      font-style: normal;
                      font-weight: 700;
                      line-height: 32px;
                      margin: 0;
                    ">
                    Hi ${data.user?.firstName},
                      </h1>
                      <p style="
                      color: #222b45;
                      font-family: 'Inter', sans-serif;
                      font-size: 16px;
                      font-style: normal;
                      font-weight: 400;
                      line-height: 28px;
                    ">
                        A new announcement was posted to the Wagmatcook Community Portal.  See details below and follow the link to learn more.
                      </p>
      
                      <p style="
                      font-family: 'Inter', sans-serif;
                      color: #222B45;
      
                       font-size: 16px;
                       font-style: normal;
                      font-weight: 600;
                       line-height: 24px;
                      margin: 20px 0px;
                    ">
                    href="${data.announcement.shortDescription}
                       <a style="color: #093FE1;"  href="${data.announcement.redirectUrl}>Read More...  </a> 
                      </p>
                      
                      
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            </table>
            <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="left" style="
                      width: 100%;
                      color: #222b45;
                      font-family: 'Inter', sans-serif;
                      font-size: 14px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: 24px;
                      margin-bottom: 90px;
                      padding: 60px 50px 40px 50px;
                    ">
                  <p style="margin: 0px">Best regards,</p>
                  <p style="margin: 0px">The Wagmatcook Team</p>
                  <p style="margin: 0px">www.wagmatcook.com</p>
                </td>
              </tr>
            </table>
      
          </div>
        </center>
      </body>
      
      </html>
      `,
    };
  },
  leaveRejected(data) {
    return {
      subject: "Wagmatcook | Leave Rejected",
      html: `
      <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: "Inter", sans-serif;
    }

    table,
    td {
      mso-table-lspace: 0px !important;
      mso-table-rspace: 0px !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>
</head>

<body>
  <center style="width: 100%">
    <div style="max-width: 700px; margin: 0 auto" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto">
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
            >
              <tr>
                <td style="text-align: left; padding: 36px 50px 0px 50px">
                  <p style="
                        color:#093FE1;
                        font-family: 'Inter', sans-serif;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: -0.48px;
                        width: 100%;
                      ">
                    Your Community Portal
                  </p>
                </td>
              <tr>
                <td align="center">
                  <center style="width: 152px;
height: 152px; background-color: #FFEDED;; border-radius: 50%;">
                    <img src="https://hrapi.chantsit.com/public/reject.png"
                    style="margin: 25px;" />
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="
              color: #222B45;
              text-align: center;
              font-family: 'Inter', sans-serif;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 48px; /* 150% */
              letter-spacing: -0.64px;
              width: 80%;
              margin: 20px auto;
            ">
                    Leave Request Rejected!
                  </p>
                </td>
              </tr>
        </tr>
      </table>
      </td>
      </tr>
      <tr>
        <td align="left">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                <h1 style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
              ">
              Hi ${
                data.request.employee.name ||
                data.request.employee.personalInfo?.firstName
              },
                </h1>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Your leave request has not been approved.
                </p>

                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Following are the applied leave details:
                </p>

                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
              Leave type:<span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
                ${data.request.leaveType?.name}
              </span>
            </p>
            <p style="
            width: 100%;
            color: #222b45;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin: 0px;
          ">
              From Date:<span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
            ${moment.utc(data.request.from || "").format("MMM DD yyyy")}</span>
            </p>
            <p style="
            width: 100%;
            color: #222b45;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin: 0px;
          ">
              To Date:
              <span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
            ${moment.utc(data.request.to || "").format("MMM DD yyyy")}</span>
            </p>
            <p style="
            width: 100%;
            color: #222b45;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin: 0px;
          ">
              Hours:
              <span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
                
            ${data.request.hours} hour(s)
                  </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 25px 0px 35px 0px;
              ">
                 Please view details for more information or to re-submit a new request
                </p>
                <a style="border-radius: 8px;
    margin-top: 35px;
  color: #fff;
  text-align: center;
 font-family: 'Inter', sans-serif;
  font-size: 16px;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
    display: inline-block;
  cursor: pointer;
   text-decoration: none;
  border: none;
  border-radius: 8px;
  background: #279af1;
  padding: 0.75em 1.25em;" href="${data.request.redirectUrl}">View Details</a>

              </td>
            </tr>



          </table>

        </td>

      </tr>
      </table>
      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="left" style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
               
                padding: 60px 50px 40px 50px;
              ">
            <p style="margin: 0px">Best regards,</p>
            <p style="margin: 0px">The Wagmatcook Team</p>
            <p style="margin: 0px">www.wagmatcook.com</p>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>
      
      `,
    };
  },
  leaveApproved(data) {
    return {
      subject: "Wagmatcook | Leave Approved",
      html: `
      <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: "Inter", sans-serif;
    }

    table,
    td {
      mso-table-lspace: 0px !important;
      mso-table-rspace: 0px !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>
</head>

<body>
  <center style="width: 100%">
    <div style="max-width: 700px; margin: 0 auto" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto">
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
            >
              <tr>
                <td style="text-align: left; padding: 36px 50px 0px 50px">
                  <p style="
                        color:#093FE1;
                        font-family: 'Inter', sans-serif;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: -0.48px;
                        width: 100%;
                      ">
                    Your Community Portal
                  </p>
                </td>
              <tr>
                <td align="center">
                  <center style="width: 152px;
height: 152px; background-color: #F1FFEF; border-radius: 50%;">
                    <img src="https://hrapi.chantsit.com/public/approved.png"
                    style="margin: 25px;" />
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="
              color: #222B45;
              text-align: center;
              font-family: 'Inter', sans-serif;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 48px; /* 150% */
              letter-spacing: -0.64px;
              width: 80%;
              margin: 20px auto;
            ">
                    Leave Request Approved!
                  </p>
                </td>
              </tr>
        </tr>
      </table>
      </td>
      </tr>
      <tr>
        <td align="left">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                <h1 style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
              ">
                 Hi ${
                   data.request.employee.name ||
                   data.request.employee.personalInfo?.firstName
                 },
                </h1>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Your leave request has been approved. Please log on to
                  https://wagmatcook.com/ and review the leave application.
                </p>

                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Following are the applied leave details:
                </p>

                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
              Leave type:<span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
                ${data.request.leaveType?.name}
              </span>
            </p>
            <p style="
            width: 100%;
            color: #222b45;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin: 0px;
          ">
              From Date:<span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
            ${moment.utc(data.request.from || "").format("MMM DD yyyy")}</span>
            </p>
            <p style="
            width: 100%;
            color: #222b45;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin: 0px;
          ">
              To Date:
              <span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
            ${moment.utc(data.request.to || "").format("MMM DD yyyy")}</span>
            </p>
            <p style="
            width: 100%;
            color: #222b45;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin: 0px;
          ">
              Hours:
              <span style="
              color: #222b45;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 32px;
              margin: 0px;
            ">
                
            ${data.request.hours} hour(s)
                  </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 25px 0px 35px 0px;
              ">
                  Please View Details for more informaiton.
                </p>
                <a style="border-radius: 8px;
    margin-top: 35px;
  color: #fff;
  text-align: center;
    display: inline-block;
  cursor: pointer;
   text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  background: #279af1;
  padding: 0.75em 1.25em;" href="${data.request.redirectUrl}">View Details</a>

              </td>
            </tr>



          </table>

        </td>

      </tr>
      </table>
      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="left" style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 90px;
                padding: 60px 50px 40px 50px;
              ">
            <p style="margin: 0px">Best regards,</p>
            <p style="margin: 0px">The Wagmatcook Team</p>
            <p style="margin: 0px">www.wagmatcook.com</p>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>
      
      `,
    };
  },
  leaveRequest(data) {
    return {
      subject: "Wagmatcook | New Leave Request",
      html: `
      <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: "Inter", sans-serif;
    }

    table,
    td {
      mso-table-lspace: 0px !important;
      mso-table-rspace: 0px !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>
</head>

<body>
  <center style="width: 100%">
    <div style="max-width: 700px; margin: 0 auto" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto">
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
            >
              <tr>
                <td style="text-align: left; padding: 36px 50px 0px 50px">
                  <p style="
                        color:#093FE1;
                        font-family: 'Inter', sans-serif;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: -0.48px;
                        width: 100%;
                      ">
                    Your Community Portal
                  </p>
                </td>
              <tr>
                <td align="center">
                  <center style="width: 152px;
height: 152px; background-color: #EDF1FF; border-radius: 50%;">
                    <img src="https://hrapi.chantsit.com/public/request.png"
                    style="margin: 25px;" />
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="
              color: #222B45;
              text-align: center;
              font-family: 'Inter', sans-serif;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 48px; /* 150% */
              letter-spacing: -0.64px;
              width: 80%;
              margin: 20px auto;
            ">
                   New Leave Request !
                  </p>
                </td>
              </tr>
        </tr>
      </table>
      </td>
      </tr>
      <tr>
        <td align="left">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                <h1 style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
              ">
                  Hi ${
                    data.request.responder.name ||
                    data.request.responder.personalInfo?.firstName
                  },
                </h1>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                 You have received a leave request from ${
                   data.request.employee.name ||
                   data.request.employee.personalInfo?.firstName
                 } which requires your action.
                </p>

                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Following are the applied leave details:
                </p>

                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Leave type:<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                    ${data.request.leaveType?.name}
                  </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  From Date:<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${moment
                  .utc(data.request.from || "")
                  .format("MMM DD yyyy")}</span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  To Date:
                  <span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${moment
                  .utc(data.request.to || "")
                  .format("MMM DD yyyy")}</span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Hours:
                  <span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                    
                ${data.request.hours} hour(s)
                  </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin:25px 0px 35px 0px;
              ">
                 Please view details for more information and action.
                </p>
                <a style="border-radius: 8px;
    margin-top: 35px;
  color: #fff;
  text-align: center;
    display: inline-block;
  cursor: pointer;
   text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  background: #279af1;
  padding: 0.75em 1.25em;" href="${
    process.env.FRONTEND_URL
  }manager-management/leaves-request/${data.request.employee._id}/${
        data.request._id
      }">View Details</a>

              </td>
            </tr>



          </table>

        </td>

      </tr>
      </table>
      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="left" style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 90px;
                padding: 60px 50px 40px 50px;
              ">
            <p style="margin: 0px">Best regards,</p>
            <p style="margin: 0px">The Wagmatcook Team</p>
            <p style="margin: 0px">www.wagmatcook.com</p>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>
      
      `,
    };
  },
  taskAssigned(data) {
    return {
      subject: "Wagmatcook | New Task Assigned",
      html: `
        <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: "Inter", sans-serif;
    }

    table,
    td {
      mso-table-lspace: 0px !important;
      mso-table-rspace: 0px !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>
</head>

<body>
  <center style="width: 100%">
    <div style="max-width: 700px; margin: 0 auto" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto">
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="text-align: left; padding: 36px 50px 0px 50px">
                  <p style="
                        color:#093FE1;
                        font-family: 'Inter', sans-serif;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: -0.48px;
                        width: 100%;
                      ">
                    Your Community Portal
                  </p>
                </td>
              <tr>
                <td align="center">
                   <center>
                    <img src="https://hrapi.chantsit.com/public/task.png" style=" width: 152px;
height: 152px;" />
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="
              color: #222B45;
              text-align: center;
              font-family: 'Inter', sans-serif;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 48px; /* 150% */
              letter-spacing: -0.64px;
              width: 80%;
              margin: 20px auto;
            ">
                    New Task Assigned !
                  </p>
                </td>
              </tr>
        </tr>
      </table>
      </td>
      </tr>
      <tr>
        <td align="left">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                <h1 style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
              ">
              Hi ${
                data.task.assignee.name ||
                data.task.assignee.personalInfo?.firstName
              },
                </h1>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  You have assigned a new task by ${
                    data.task.assigner.name ||
                    data.task.assigner.personalInfo?.firstName
                  }.
                </p>

                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                  Following are the task details:
                </p>

                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Title :<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${data.task.title}
                  </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Due Date:<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${moment
                  .utc(data.task.dueDate || "")
                  .format("MMM DD yyyy")} </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Description :
                  <span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${data.task.description} </span>
                </p>

                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 25px 0px 35px 0px;
              ">
                  Please view details for more information.
                </p>
                <a style="border-radius: 8px;
    margin-top: 35px;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
    display: inline-block;
  cursor: pointer;
   text-decoration: none;
  border: none;
  border-radius: 8px;
  background: #279af1;
  padding: 0.75em 1.25em;" href="${data.task.redirectUrl}">View Details</a>

              </td>
            </tr>



          </table>

        </td>

      </tr>
      </table>
      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="left" style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 90px;
                padding: 60px 50px 40px 50px;
              ">
            <p style="margin: 0px">Best regards,</p>
            <p style="margin: 0px">The Wagmatcook Team</p>
            <p style="margin: 0px">www.wagmatcook.com</p>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>
        `,
    };
  },
  taskStatusUpdate(data) {
    return {
      subject: "Wagmatcook | Task Status Updated",
      html: `
        <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: "Inter", sans-serif;
    }

    table,
    td {
      mso-table-lspace: 0px !important;
      mso-table-rspace: 0px !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>
</head>

<body>
  <center style="width: 100%">
    <div style="max-width: 700px; margin: 0 auto" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto">
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="text-align: left; padding: 36px 50px 0px 50px">
                  <p style="
                        color:#093FE1;
                        font-family: 'Inter', sans-serif;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: -0.48px;
                        width: 100%;
                      ">
                    Your Community Portal
                  </p>
                </td>
              <tr>
                <td align="center">
                  <center style="">
                    <img src="https://hrapi.chantsit.com/public/status.png" style=" width: 152px; height: 152px;" />
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="
              color: #222B45;
              text-align: center;
              font-family: 'Inter', sans-serif;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 48px; /* 150% */
              letter-spacing: -0.64px;
              width: 80%;
              margin: 20px auto;
            ">
                    Task Status Updated !
                  </p>
                </td>
              </tr>
        </tr>
      </table>
      </td>
      </tr>
      <tr>
        <td align="left">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                <h1 style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
              ">
                  Hi ${
                    data.task.sentTo.name ||
                    data.task.sentTo.personalInfo?.firstName
                  }
                </h1>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
                 The status of the following task was updated.
                </p>

                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Title :<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${data.task.title}
                  </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Due Date:<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${moment
                  .utc(data.task.dueDate || "")
                  .format("MMM DD yyyy")} </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Description :
                  <span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${data.task.description} </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Status :
                  <span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${data.task.isCompleted ? "Completed" : "In-progress"} </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin:25px 0px 35px 0px;
              ">
                  Please view details for more information.
                </p>
                <a style="border-radius: 8px;
    margin-top: 35px;
  color: #fff;
  text-align: center;
    display: inline-block;
  cursor: pointer;
   text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  background: #279af1;
  padding: 0.75em 1.25em;" href="${data.task.redirectUrl}">View Details</a>

              </td>
            </tr>



          </table>

        </td>

      </tr>
      </table>
      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="left" style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 90px;
                padding: 60px 50px 40px 50px;
              ">
            <p style="margin: 0px">Best regards,</p>
            <p style="margin: 0px">The Wagmatcook Team</p>
            <p style="margin: 0px">www.wagmatcook.com</p>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>
        `,
    };
  },
  taskComment(data) {
    return {
      subject: "Wagmatcook | New Comment on Task",
      html: `
        <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: "Inter", sans-serif;
    }

    table,
    td {
      mso-table-lspace: 0px !important;
      mso-table-rspace: 0px !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>
</head>

<body>
  <center style="width: 100%">
    <div style="max-width: 700px; margin: 0 auto" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto">
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="text-align: left; padding: 36px 50px 0px 50px">
                  <p style="
                        color:#093FE1;
                        font-family: 'Inter', sans-serif;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: -0.48px;
                        width: 100%;
                      ">
                    Your Community Portal
                  </p>
                </td>
              <tr>
                <td align="center">
                  <center style="width: 152px;
height: 152px; background-color: #EDF1FF; border-radius: 50%;">
                    <img src="https://hrapi.chantsit.com/public/commentbg.png" style="margin: 20px;" />
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="
              color: #222B45;
              text-align: center;
              font-family: 'Inter', sans-serif;
              font-size: 32px;
              font-style: normal;
              font-weight: 700;
              line-height: 48px; /* 150% */
              letter-spacing: -0.64px;
              width: 80%;
              margin: 20px auto;
            ">
            New Comment on Task !
                  </p>
                </td>
              </tr>
        </tr>
      </table>
      </td>
      </tr>
      <tr>
        <td align="left">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: left; padding: 40px 50px 0px 50px;">
                <h1 style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
              ">
                  Hi ${
                    data.task.sentTo.name ||
                    data.task.sentTo.personalInfo?.firstName
                  }
                </h1>
                <p style="
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px;
              ">
              ${
                data.comment.commenter.name ||
                data.comment.commenter.personalInfo?.firstName
              } commented on the following task.
                </p>

                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Title :<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${data.task.title}
                  </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Due Date:<span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${moment
                  .utc(data.task.dueDate || "")
                  .format("MMM DD yyyy")} </span>
                </p>
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin: 0px;
              ">
                  Description :
                  <span style="
                  color: #222b45;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 32px;
                  margin: 0px;
                ">
                ${data.task.description} </span>
                </p>
               
                <p style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
                margin:25px 0px 35px 0px;
              ">
                  Please view details for more information.
                </p>
                <a style="border-radius: 8px;
    margin-top: 35px;
  color: #fff;
  text-align: center;
    display: inline-block;
  cursor: pointer;
   text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  background: #279af1;
  padding: 0.75em 1.25em;" href="${data.task.redirectUrl}">View Details</a>

              </td>
            </tr>



          </table>

        </td>

      </tr>
      </table>
      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="left" style="
                width: 100%;
                color: #222b45;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 90px;
                padding: 60px 50px 40px 50px;
              ">
            <p style="margin: 0px">Best regards,</p>
            <p style="margin: 0px">The Wagmatcook Team</p>
            <p style="margin: 0px">www.wagmatcook.com</p>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>
        `,
    };
  },
};

module.exports = emailTemplates;
// forgotPassword(data) {
//     return {
//         subject: "Wagmatcook | Password Reset",
//         html: getFullTemplate(
//             data,
//             `
//             <div class="f-fallback">
//                 <h1>Hi ${data.req.body.email},</h1>
//                 <p>You are receiving this email because you (or someone else) has requested
//                     the reset of the password for your account.

//                 </p>
//                 <table class="body-action" align="center" width="100%" cellpadding="0"
//                     cellspacing="0" role="presentation">
//                     <tr>
//                         <td align="center">
//                             <table width="100%" border="0" cellspacing="0" cellpadding="0"
//                                 role="presentation">
//                                 <tr>
//                                     <td align="center">
//                                         <a href="${process.env.FRONTEND_URL}reset-password/${data.token}"
//                                             class="f-fallback button " target="_blank">Reset
//                                             your password</a>
//                                     </td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>
//                 </table>
//                 <p>If you did not request this, please ignore this email and your password
//                     will remain unchanged.</p>
//                 <p>Thanks,
//                     <br>The Wagmatcook Team
//                 </p>
//                 <!-- Sub copy -->
//                 <table class="body-sub" role="presentation">
//                     <tr>
//                         <td>
//                             <p class="f-fallback sub">If you’re having trouble with the
//                                 button above, copy and paste the URL below into your web
//                                 browser.</p>
//                             <p class="f-fallback sub">
//                                 ${process.env.FRONTEND_URL}reset-password/${data.token}
//                             </p>
//                         </td>
//                     </tr>
//                 </table>
//             </div>
//         `
//         ),
//     };
// },

// inviteUser(data) {
//     return {
//         subject: "Wagmatcook | Invitation to signup",
//         html: getFullTemplate(
//             data,
//             `
//                 <div class="f-fallback">
//                     <h1>Hi ${data.req.body.email},</h1>
//                     <p>We are excited to invite you to join our online portal! Our portal offers
//                         a convenient way to access our services and stay up-to-date with
//                         important information.

//                     </p>
//                     <p>We look forward to having you as a member of our online community!
//                         <!-- <strong>This invitation link is only valid for the next 24
//                             hours.</strong> -->
//                             </p>
//                     <table class="body-action" align="center" width="100%" cellpadding="0"
//                         cellspacing="0" role="presentation">
//                         <tr>
//                             <td align="center">
//                                 <table width="100%" border="0" cellspacing="0" cellpadding="0"
//                                     role="presentation">
//                                     <tr>
//                                         <td align="center">
//                                             <a href="${process.env.FRONTEND_URL}auth/complete-signup/${data.email}/${data.token}"
//                                                 class="f-fallback button "
//                                                 target="_blank">Accept the Invitation</a>
//                                         </td>
//                                     </tr>
//                                 </table>
//                             </td>
//                         </tr>
//                     </table>
//                     <!-- <p>For security, this request was received from a {{operating_system}} device using {{browser_name}}. If you do not want to join, please ignore this email or <a href="{{support_url}}">contact support</a> if you have questions.</p> -->
//                     <p>Thanks,
//                         <br>The Wagmatcook Team
//                     </p>
//                     <!-- Sub copy -->
//                     <table class="body-sub" role="presentation">
//                         <tr>
//                             <td>
//                                 <p class="f-fallback sub">If you’re having trouble with the
//                                     button above, copy and paste the URL below into your web
//                                     browser.</p>
//                                 <p class="f-fallback sub">
//                                 ${process.env.FRONTEND_URL}auth/complete-signup/${data.email}/${data.token}
//                                 </p>
//                             </td>
//                         </tr>
//                     </table>
//                 </div>
//             `
//         ),
//     };
// },
// tempPassword(data) {
//     return {
//         subject: "Wagmatcook | Temporary Password",
//         html: getFullTemplate(
//             data,
//             `
//             <div class="f-fallback">
//                 <h1>Hi ${data.req.user.name},</h1>
//                 <p>We received a request to verify your account. To complete the verification process, please use the following temporary password:

//                 </p>
//                 <table class="body-action" align="center" width="100%" cellpadding="0"
//                     cellspacing="0" role="presentation">
//                     <tr>
//                         <td align="center">
//                             <table width="100%" border="0" cellspacing="0" cellpadding="0"
//                                 role="presentation">
//                                 <tr>
//                                     <td align="center">
//                                     Temporary Password: <strong>${data.token}</strong>
//                                          </td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>
//                 </table>
//                 <p>This temporary password is valid for a limited time and should be used within 24 hours.</p>
//                 <p> Do not share this temporary password with anyone.</p>
//                 <p>Thanks,
//                     <br>The Wagmatcook Team
//                 </p>

//             </div>
//         `
//         ),
//     };
// },
