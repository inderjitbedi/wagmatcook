const emailTemplates = {
  forgotPassword(data) {
    return {
      subject: "Wagmatcook | Password Reset",
      html: getFullTemplate(
        data,
        `
                <div class="f-fallback">
                    <h1>Hi ${data.req.body.email},</h1>
                    <p>You are receiving this email because you (or someone else) has requested
                        the reset of the password for your account.

                    </p>
                    <table class="body-action" align="center" width="100%" cellpadding="0"
                        cellspacing="0" role="presentation">
                        <tr>
                            <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                    role="presentation">
                                    <tr>
                                        <td align="center">
                                            <a href="${process.env.FRONTEND_URL}reset-password/${data.token}"
                                                class="f-fallback button " target="_blank">Reset
                                                your password</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <p>If you did not request this, please ignore this email and your password
                        will remain unchanged.</p>
                    <p>Thanks,
                        <br>The Wagmatcook Team
                    </p>
                    <!-- Sub copy -->
                    <table class="body-sub" role="presentation">
                        <tr>
                            <td>
                                <p class="f-fallback sub">If you’re having trouble with the
                                    button above, copy and paste the URL below into your web
                                    browser.</p>
                                <p class="f-fallback sub">
                                    ${process.env.FRONTEND_URL}reset-password/${data.token}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            `
      ),
    };
  },
  invite(data) {
    return {
      subject: "Wagmatcook | Invitation to Sign Up",
      html: getFullTemplate(
        data,
        `
                <div class="f-fallback">
                    <h1>Hi ${data.user.email},</h1>
                    <p>  You've been invited to join our platform. Your presence will be highly appreciated.
                    </p>
                    <table class="body-action" align="center" width="100%" cellpadding="0"
                        cellspacing="0" role="presentation">
                        <tr>
                            <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                    role="presentation">
                                    <tr>
                                        <td align="center">
                                            <a href="${process.env.FRONTEND_URL}organization-admin/complete-signup/${data.user.email}/${data.user.invitationToken}"
                                                class="f-fallback button " target="_blank">Complete Signup</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <p> If you have any questions or need assistance, please don't hesitate to contact us.</p>
                    <p>Thanks,
                        <br>The Wagmatcook Team
                    </p>
                    <!-- Sub copy -->
                    <table class="body-sub" role="presentation">
                        <tr>
                            <td>
                                <p class="f-fallback sub">If you’re having trouble with the
                                    button above, copy and paste the URL below into your web
                                    browser.</p>
                                <p class="f-fallback sub">
                                    ${process.env.FRONTEND_URL}organization-admin/complete-signup/${data.user.email}/${data.user.invitationToken}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            `
      ),
    };
  },

  tempPassword(data) {
    return {
      subject: "Wagmatcook | Temporary Password",
      html: getFullTemplate(
        data,
        `
                <div class="f-fallback">
                    <h1>Hi ${data.req.user.name},</h1>
                    <p>We received a request to verify your account. To complete the verification process, please use the following temporary password:

                    </p>
                    <table class="body-action" align="center" width="100%" cellpadding="0"
                        cellspacing="0" role="presentation">
                        <tr>
                            <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                    role="presentation">
                                    <tr>
                                        <td align="center">
                                        Temporary Password: <strong>${data.token}</strong>
                                             </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <p>This temporary password is valid for a limited time and should be used within 24 hours.</p>
                    <p> Do not share this temporary password with anyone.</p>
                    <p>Thanks,
                        <br>The Wagmatcook Team
                    </p>
                 
                </div>
            `
      ),
    };
  },
  sendOtp(data) {
    return {
      subject: "Wagmatcook | One Time Password",
      html: getFullTemplate(
        data,
        `
                <div class="f-fallback">
                    <h1>Hi ${data.req.user.name || data.req.user.email},</h1>
                    <p>You are receiving this email because you requested a One-Time Password (OTP) for signing in. Your OTP is an additional layer of security to verify your identity. Please do not share this OTP with anyone.

                    </p>
                    <table class="body-action" align="center" width="100%" cellpadding="0"
                        cellspacing="0" role="presentation">
                        <tr>
                            <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                    role="presentation">
                                    <tr>
                                        <td align="center">
                                        OTP: <strong>${data.token}</strong>
                                             </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <p>This otp is valid for a limited time and should be used within 24 hours.</p>
                    <p>Thanks,
                        <br>The Wagmatcook Team
                    </p>
                 
                </div>
            `
      ),
    };
  },

  inviteUser(data) {
    return {
      subject: "Wagmatcook | Invitation to signup",
      html: getFullTemplate(
        data,
        `
                    <div class="f-fallback">
                        <h1>Hi ${data.req.body.email},</h1>
                        <p>We are excited to invite you to join our online portal! Our portal offers
                            a convenient way to access our services and stay up-to-date with
                            important information.

                        </p>
                        <p>We look forward to having you as a member of our online community! 
                            <!-- <strong>This invitation link is only valid for the next 24
                                hours.</strong> -->
                                </p>
                        <table class="body-action" align="center" width="100%" cellpadding="0"
                            cellspacing="0" role="presentation">
                            <tr>
                                <td align="center">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                        role="presentation">
                                        <tr>
                                            <td align="center">
                                                <a href="${process.env.FRONTEND_URL}auth/complete-signup/${data.email}/${data.token}"
                                                    class="f-fallback button "
                                                    target="_blank">Accept the Invitation</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!-- <p>For security, this request was received from a {{operating_system}} device using {{browser_name}}. If you do not want to join, please ignore this email or <a href="{{support_url}}">contact support</a> if you have questions.</p> -->
                        <p>Thanks,
                            <br>The Wagmatcook Team
                        </p>
                        <!-- Sub copy -->
                        <table class="body-sub" role="presentation">
                            <tr>
                                <td>
                                    <p class="f-fallback sub">If you’re having trouble with the
                                        button above, copy and paste the URL below into your web
                                        browser.</p>
                                    <p class="f-fallback sub">
                                    ${process.env.FRONTEND_URL}auth/complete-signup/${data.email}/${data.token}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                `
      ),
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
                    Wagmatcook
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
                  Hi, Tom
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
                    Earned Leave
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
                    27 Mar 2023</span>
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
                    31 Mar 2023</span>
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
                    8 hours
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
                margin: 25px 0px 0px 0px;
              ">
                 Please view details for more information or to re-submit a new request
                </p>
                <button style="border-radius: 8px;
    margin-top: 35px;
  color: #fff;
  text-align: center;
 font-family: 'Inter', sans-serif;
  font-size: 16px;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  background: #279af1;
  padding: 0.75em 1.25em;">View Details</button>

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

</html>`,
    };
  },
};

const footer = ` <div class="footer">
<div class="icons-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="#ECECEC" />
        <path
            d="M33.4783 22C33.4783 15.6607 28.3393 10.5217 22 10.5217C15.6607 10.5217 10.5217 15.6607 10.5217 22C10.5217 27.729 14.7191 32.4777 20.2065 33.3388V25.3179H17.2921V22H20.2065V19.4712C20.2065 16.5944 21.9202 15.0054 24.542 15.0054C25.7975 15.0054 27.1114 15.2296 27.1114 15.2296V18.0543H25.6641C24.2383 18.0543 23.7935 18.9392 23.7935 19.8478V22H26.9769L26.468 25.3179H23.7935V33.3388C29.2808 32.4777 33.4783 27.729 33.4783 22Z"
            fill="#6D6D6D" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="#ECECEC" />
        <path
            d="M21.5215 19.4348V23.88H27.6989C27.4276 25.3096 26.6136 26.5201 25.3927 27.334L29.1179 30.2244C31.2884 28.221 32.5406 25.2784 32.5406 21.7828C32.5406 20.9689 32.4675 20.1862 32.3318 19.4349L21.5215 19.4348Z"
            fill="#6D6D6D" />
        <path
            d="M15.0888 23.7065L14.2486 24.3497L11.2747 26.6662C13.1633 30.4122 17.0344 33.0001 21.5213 33.0001C24.6203 33.0001 27.2186 31.9775 29.1177 30.2245L25.3925 27.334C24.3699 28.0227 23.0656 28.4401 21.5213 28.4401C18.537 28.4401 16.0014 26.4262 15.0935 23.7132L15.0888 23.7065Z"
            fill="#6D6D6D" />
        <path
            d="M11.2747 16.3774C10.4921 17.9217 10.0435 19.6644 10.0435 21.5217C10.0435 23.3791 10.4921 25.1217 11.2747 26.666C11.2747 26.6764 15.0939 23.7025 15.0939 23.7025C14.8643 23.0138 14.7286 22.2834 14.7286 21.5216C14.7286 20.7598 14.8643 20.0294 15.0939 19.3407L11.2747 16.3774Z"
            fill="#6D6D6D" />
        <path
            d="M21.5215 14.6139C23.212 14.6139 24.7146 15.1982 25.9146 16.3252L29.2015 13.0383C27.2084 11.1809 24.6207 10.0435 21.5215 10.0435C17.0346 10.0435 13.1633 12.6208 11.2747 16.3774L15.0937 19.3409C16.0015 16.6278 18.5372 14.6139 21.5215 14.6139Z"
            fill="#6D6D6D" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="#ECECEC" />
        <path
            d="M28.0512 12.3428H31.278L24.2284 20.4L32.5217 31.3641H26.0282L20.9421 24.7145L15.1226 31.3641H11.8938L19.4341 22.746L11.4783 12.3428H18.1367L22.734 18.4208L28.0512 12.3428ZM26.9187 29.4327H28.7067L17.1652 14.1727H15.2465L26.9187 29.4327Z"
            fill="#6D6D6D" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="#ECECEC" />
        <path
            d="M32.0584 10.1938H11.9371C10.9732 10.1938 10.1938 10.9548 10.1938 11.8956V32.0999C10.1938 33.0407 10.9732 33.8063 11.9371 33.8063H32.0584C33.0223 33.8063 33.8063 33.0407 33.8063 32.1045V11.8956C33.8063 10.9548 33.0223 10.1938 32.0584 10.1938ZM17.1992 30.3151H13.6942V19.0439H17.1992V30.3151ZM15.4467 17.5082C14.3214 17.5082 13.4129 16.5996 13.4129 15.479C13.4129 14.3583 14.3214 13.4498 15.4467 13.4498C16.5674 13.4498 17.4759 14.3583 17.4759 15.479C17.4759 16.595 16.5674 17.5082 15.4467 17.5082ZM30.3151 30.3151H26.8148V24.8363C26.8148 23.5312 26.7917 21.8479 24.9931 21.8479C23.1715 21.8479 22.8947 23.2729 22.8947 24.7441V30.3151H19.399V19.0439H22.7564V20.5842H22.8025C23.2683 19.6988 24.412 18.7626 26.1138 18.7626C29.6603 18.7626 30.3151 21.0961 30.3151 24.1307V30.3151Z"
            fill="#6D6D6D" />
    </svg>
</div>
<div class="footer-text">
    <span>Designed with love</span>
    Tangkimail, 2972 Westheimer Rd. Santa Ana, Illinois 85486
</div>
<p class="para">
    Don't want any more emails from Wagmatcook?
    <span class="color">Unsubscribe</span>
</p>
<span class="copyrights">All rights reserved.</span>
</div>`;

// const getFullTemplate = (data, body) => {
//     return `
//     <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Wagmatcook</title>
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;900&display=swap"
//         rel="stylesheet">
//     <style>
//         .container {
//             width: 100%;
//             display: flex;
//             /* align-items: center; */
//             justify-content: center;
//         }

//         .template-container {
//             width: 700px;
//         }

//         .header {
//             padding: 36px 50px 0px 50px;
//             background: #093fe1;
//             /* height: 552px; */
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-direction: column;
//             gap: 20px;
//         }

//         .leave-header {
//             padding: 36px 50px 48px 50px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-direction: column;
//             gap: 20px;
//         }

//         .header-reset {
//             padding: 36px 50px 48px 50px;
//             background: #093fe1;
//             /* height: 552px; */
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-direction: column;
//             gap: 30px;
//         }

//         .otp {
//             color: #222b45;
//             font-family: Inter;
//             font-size: 64px;
//             font-style: normal;
//             font-weight: 500;
//             line-height: 60px;
//             margin: 20px 0px;
//         }

//         .underline {
//             text-decoration-line: underline;
//         }

//         .reset-para {
//             width: 100%;
//             color: #222b45;
//             font-family: Inter;
//             font-size: 14px;
//             font-style: normal;
//             font-weight: 600;
//             line-height: 28px;
//             margin: 0px;
//         }

//         .leave-span {
//             color: #222b45;
//             font-family: Inter;
//             font-size: 16px;
//             font-style: normal;
//             font-weight: 600;
//             line-height: 32px;
//             margin: 0px;
//         }

//         .header-logo {
//             color: #fff;
//             font-family: Inter;
//             font-size: 24px;
//             font-style: normal;
//             font-weight: 700;
//             line-height: normal;
//             letter-spacing: -0.48px;
//             width: 100%;
//         }

//         .header-leave-logo {
//             color: #093fe1;
//             font-family: Inter;
//             font-size: 24px;
//             font-style: normal;
//             font-weight: 700;
//             line-height: normal;
//             letter-spacing: -0.48px;
//             width: 100%;
//         }

//         .header-heading {
//             color: #fff;
//             text-align: center;
//             font-family: Inter;
//             font-size: 32px;
//             font-style: normal;
//             font-weight: 700;
//             line-height: 48px;
//             /* 150% */
//             letter-spacing: -0.64px;
//             width: 80%;
//         }

//         .header-leave-heading {
//             color: #222b45;
//             text-align: center;
//             font-family: Inter;
//             font-size: 32px;
//             font-style: normal;
//             font-weight: 700;
//             line-height: 48px;
//             /* 150% */
//             letter-spacing: -0.64px;
//             text-align: center;
//             font-family: Inter;
//             font-size: 32px;
//             font-style: normal;
//             font-weight: 700;
//             line-height: 48px;
//             /* 150% */
//             letter-spacing: -0.64px;
//             width: 80%;
//         }

//         .icon-leave {
//             width: 152px;
//             height: 152px;
//             background-color: #eef2ff;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         .main {
//             /* height: 500px; */
//             padding: 40px 50px 0px 50px;
//             display: flex;
//             /* align-items: center; */
//             /* justify-content: center; */
//             flex-direction: column;
//         }

//         .border {
//             padding-bottom: 60px;
//             border-bottom: 1px solid #eaeaea;
//         }

//         .border-reset {
//             padding-bottom: 50px;
//             border-bottom: 1px solid #eaeaea;
//         }

//         .banner {
//             border-radius: 8px;
//             background: #bde0e6;
//             display: flex;
//             padding: 20px 0px;
//             align-items: center;
//             gap: 20px;
//             margin: 20px 0px 40px 0px;
//         }

//         .image {
//             width: 30%;
//         }

//         .text-container {
//             width: 70%;
//         }

//         .btn {
//             border-radius: 8px;
//             background: #fff;
//             color: #050505;
//             text-align: center;
//             font-family: Inter;
//             font-size: 16px;
//             font-style: normal;
//             font-weight: 600;
//             line-height: 16px;
//             padding: 0.8em 1.25em;
//             border: none;
//         }

//         .main-heading {
//             width: 100%;
//             color: #222b45;
//             font-family: Inter;
//             font-size: 18px;
//             font-style: normal;
//             font-weight: 700;
//             line-height: 32px;
//             margin: 0;
//         }

//
//             color: #222b45;
//             font-family: Inter;
//             font-size: 16px;
//             font-style: normal;
//             font-weight: 400;
//             line-height: 28px;
//         }

//         .grid {
//             width: 100%;
//             display: grid;

//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             grid-gap: 30px;
//             align-items: start;
//         }

//         .card {
//             display: grid;
//             grid-template-columns: min-content 1fr;
//             grid-row-gap: 8px;
//             grid-column-gap: 16px;
//         }

//         .icon {
//             grid-row: 1 / span 2;
//             transform: translateY(-8px);
//             width: 49px;
//             height: 49px;
//             background-color: #eef2ff;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }

//         .main-heading-2 {
//             color: #222b45;
//             font-family: Inter;
//             font-size: 16px;
//             font-style: normal;
//             font-weight: 700;
//             line-height: 28px;
//             margin: 0px;
//             align-items: center;
//         }

//         .card-para {
//             color: #222b45;
//             font-family: Inter;
//             font-size: 16px;
//             font-style: normal;
//             font-weight: 400;
//             line-height: 28px;
//             margin: 0;
//         }

//         .footer {
//             padding: 36px 0px 18px 0px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-direction: column;
//             gap: 20px;
//         }

//         .icons-container {
//             display: flex;
//             gap: 10px;
//         }

//         .footer-text {
//             color: #6b6b6b;
//             text-align: center;
//             font-family: Inter;
//             font-size: 14px;
//             font-style: normal;
//             font-weight: 400;
//             /* line-height: 28px; */
//             width: 80%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-direction: column;
//             gap: 10px;
//             /* margin-bottom:36px; */
//         }

//         .para {
//             color: #8f939c;
//             text-align: center;
//             font-family: Inter;
//             font-size: 14px;
//             font-style: normal;
//             font-weight: 400;
//             /* line-height: 28px; */
//         }

//         .color {
//             color: #279af1;
//         }

//         .copyrights {
//             color: #8f939c;
//             text-align: center;
//             font-family: Inter;
//             font-size: 12px;
//             font-style: normal;
//             font-weight: 400;
//             /* line-height: 28px; */
//         }

//         .btn-blue {
//             margin-top: 35px;
//             color: #fff;
//             text-align: center;
//             font-family: Inter;
//             font-size: 16px;
//             font-style: normal;
//             font-weight: 600;
//             line-height: 16px;
//             border: none;
//             border-radius: 8px;
//             background: #279af1;
//             padding: 0.75em 1.25em;
//         }

//         @media screen and (max-width: 650px) {
//             .header {
//                 padding: 10px 10px 0px 10px;

//                 gap: 15px;
//             }

//             .leave-header {
//                 /* padding: 20px 20px 20px 20px; */
//                 padding: 10px;

//                 gap: 15px;
//             }

//             .header-reset {
//                 /* padding: 20px 20px 20px 20px; */
//                 padding: 10px;

//                 gap: 25px;
//             }

//             .main {
//                 /* height: 500px; */
//                 /* padding: 40px 50px 0px 50px; */
//                 padding: 10px 10px 0px 10px;
//             }

//             .header-heading {
//                 color: #fff;
//                 text-align: center;
//                 font-family: Inter;
//                 font-size: 22px;
//                 font-style: normal;
//                 font-weight: 600;
//                 line-height: 38px;
//                 /* 150% */

//                 width: 100%;
//             }
//         }
//     </style>
// </head>

// <body>

//     <div style=" width: 100%;
//   display: flex;

//   justify-content: center;">
//         <div style="  width: 700px;">
//             ${body}
//             ${footer}
//         </div>
//     </div>
// </body>

// </html>
//     `
// }

const getFullTemplate = (data, body) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="www.w3.org/1999/xhtml">
   
   <head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta name="x-apple-disable-message-reformatting" />
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
       <meta name="color-scheme" content="light dark" />
       <meta name="supported-color-schemes" content="light dark" />
       <title></title>
       <style type="text/css" rel="stylesheet" media="all">
           @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
   
           .ii a[href] {
               color: white !important
           }
   
           img {
               width: 165px
           }
   
           h1,
           h2,
           h3 {
               margin-top: 0;
               color: #333;
               text-align: left;
               font-weight: 700
           }
   
           .button,
           body {
               -webkit-text-size-adjust: none
           }
   
           .purchase_total,
           h1,
           h2,
           h3 {
               font-weight: 700
           }
   
           body {
               width: 100% !important;
               height: 100%;
               margin: 0;
               background-color: #f2f4f6;
               color: #51545e
           }
   
           a {
               color: #fff
           }
   
           a[href] {
               color: #fff !important
           }
   
           a img {
               border: none
           }
   
           td {
               word-break: break-word
           }
   
           .preheader {
               display: none !important;
               visibility: hidden;
               mso-hide: all;
               font-size: 1px;
               line-height: 1px;
               max-height: 0;
               max-width: 0;
               opacity: 0;
               overflow: hidden
           }
   
           .purchase_item,
           .related_item {
               font-size: 15px;
               line-height: 18px
           }
   
           body,
           td,
           th {
               font-family: "Nunito Sans", Helvetica, Arial, sans-serif
           }
   
           h1 {
               font-size: 22px
           }
   
           h2 {
               font-size: 16px
           }
   
           h3 {
               font-size: 14px
           }
   
           td,
           th {
               font-size: 16px
           }
   
           blockquote,
           ol,
           p,
           ul {
               margin: .4em 0 1.1875em;
               font-size: 16px;
               line-height: 1.625
           }
   
           p.sub {
               font-size: 13px
           }
   
           .align-right {
               text-align: right
           }
   
           .align-left {
               text-align: left
           }
   
           .align-center,
           .discount_heading {
               text-align: center
           }
   
           .u-margin-bottom-none {
               margin-bottom: 0
           }
   
           .button {
               background-color: #fff;
              
               display: inline-block;
               color: #15c;
               text-decoration: none;
               border-radius: 3px;
               box-shadow: 0 2px 3px rgba(0, 0, 0, .16);
               box-sizing: border-box;
               border: 1px solid #15c;
               padding: 8px 16px;
               cursor: pointer;
           }
   
           .button--green {
               background-color: #22bc66;
               border-top: 10px solid #22bc66;
               border-right: 18px solid #22bc66;
               border-bottom: 10px solid #22bc66;
               border-left: 18px solid #22bc66
           }
   
           .button--red {
               background-color: #ff6136;
               border-top: 10px solid #ff6136;
               border-right: 18px solid #ff6136;
               border-bottom: 10px solid #ff6136;
               border-left: 18px solid #ff6136
           }
   
           @media only screen and (max-width:500px) {
               .button {
                   width: 100% !important;
                   text-align: center !important
               }
           }
   
           .discount,
           .purchase_content,
           .related {
               width: 100%;
               -premailer-width: 100%;
               -premailer-cellpadding: 0;
               -premailer-cellspacing: 0
           }
   
           .attributes {
               margin: 0 0 21px
           }
   
           .attributes_content {
               background-color: #f4f4f7;
               padding: 16px
           }
   
           .attributes_item {
               padding: 0
           }
   
           .purchase_content,
           .related {
               margin: 0;
               padding: 25px 0 0
           }
   
           .related_item {
               padding: 10px 0;
               color: #cbcccf
           }
   
           .related_item-title {
               display: block;
               margin: .5em 0 0
           }
   
           .related_item-thumb {
               display: block;
               padding-bottom: 10px
           }
   
           .related_heading {
               border-top: 1px solid #cbcccf;
               text-align: center;
               padding: 25px 0 10px
           }
   
           .discount {
               margin: 0;
               padding: 24px;
               background-color: #f4f4f7;
               border: 2px dashed #cbcccf
           }
   
           .social,
           .social td {
               width: auto
           }
   
           .body-sub,
           .purchase_footer {
               border-top: 1px solid #eaeaec
           }
   
           .discount_body {
               text-align: center;
               font-size: 15px
           }
   
           .social td {
               padding: 0
           }
   
           .social_icon {
               height: 20px;
               margin: 0 8px 10px;
               padding: 0
           }
   
           .purchase {
               width: 100%;
               margin: 0;
               padding: 35px 0;
               -premailer-width: 100%;
               -premailer-cellpadding: 0;
               -premailer-cellspacing: 0
           }
   
           .purchase_item {
               padding: 10px 0;
               color: #51545e
           }
   
           .purchase_heading {
               padding-bottom: 8px;
               border-bottom: 1px solid #eaeaec
           }
   
           .purchase_heading p {
               margin: 0;
               color: #85878e;
               font-size: 12px
           }
   
           .purchase_footer {
               padding-top: 15px
           }
   
           .purchase_total {
               margin: 0;
               text-align: right;
               color: #333
           }
   
           .body-action,
           .email-footer
            {
               text-align: center
           }
   
           .purchase_total--label {
               padding: 0 15px 0 0
           }
   
           .email-body,
           .email-content,
           .email-wrapper {
               width: 100%;
               margin: 0;
               padding: 0;
               -premailer-width: 100%;
               -premailer-cellpadding: 0;
               -premailer-cellspacing: 0
           }
   
           p {
               color: #51545e
           }
   
           .email-wrapper {
               background-color: #f2f4f6
           }
   
           .email-masthead {
               padding: 25px 0;
               display: flex;
               justify-content: center;
               align-items: center ;
           }
   
           .email-masthead_logo {
               width: 94px;
           }
   
           .email-body_inner,
           .email-footer {
               width: 570px;
               margin: 0 auto;
               -premailer-width: 570px;
               padding: 0;
               -premailer-cellpadding: 0;
               -premailer-cellspacing: 0
           }
   
           .email-masthead_name {
               font-size: 16px;
               font-weight: 700;
               color: #a8aaaf;
               text-decoration: none;
               text-shadow: 0 1px 0 #fff
           }
   
           .email-body_inner {
               background-color: #fff
           }
   
           .email-footer p {
               color: #a8aaaf
           }
   
           .body-action {
               width: 100%;
               margin: 30px auto;
               padding: 0;
               -premailer-width: 100%;
               -premailer-cellpadding: 0;
               -premailer-cellspacing: 0
           }
   
           .body-sub {
               margin-top: 25px;
               padding-top: 25px
           }
   
           .content-cell {
               padding: 45px
           }
   
           @media only screen and (max-width:600px) {
   
               .email-body_inner,
               .email-footer {
                   width: 100% !important
               }
           }
   
           @media (prefers-color-scheme:dark) {
   
               .email-body,
               .email-body_inner,
               .email-content,
               .email-footer,
               .email-masthead,
               .email-wrapper,
               body {
                   background-color: #333 !important;
                   color: #fff !important
               }
   
               .purchase_item,
               blockquote,
               h1,
               h2,
               h3,
               ol,
               p,
               span,
               ul {
                   color: #fff !important
               }
   
               .attributes_content,
               .discount {
                   background-color: #222 !important
               }
   
               .email-masthead_name {
                   text-shadow: none !important
               }
           }
   
           :root {
               color-scheme: light dark;
               supported-color-schemes: light dark
           }
           .company-name{
            margin:auto
           }
       </style>
   </head>
   
   <body>
       <!--<span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>-->
       <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
           <tr>
               <td align="center">
                   <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                           <td class="email-masthead">
                              <h1 class="company-name">Wagmatcook</h1>   
                           </td>
                       </tr>
                       <!-- Email Body -->
                       <tr>
                           <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                               <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"
                                   role="presentation">
                                   <!-- Body content -->
                                   <tr>
                                       <td class="content-cell">
   
                                       ${body}
                                       
                                       </td>
                                       </tr>
                                   </table>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"
                                       role="presentation">
                                       <tr>
                                           <td class="content-cell" align="center">
                                               <p class="f-fallback sub align-center">
                                                   Wagmatcook
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
       </body>
       
       </html>
               `;
};
module.exports = emailTemplates;
