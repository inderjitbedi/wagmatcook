
const emailTemplates = {
    forgotPassword(data) {

        return {
            subject: 'Wagmatcook | Password Reset',
            html: getFullTemplate(data, `
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
            `)
        }
    },
    invite(data) {

        return {
            subject: 'Wagmatcook | Invitation to Sign Up',
            html: getFullTemplate(data, `
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
            `)
        }
    },

    tempPassword(data) {

        return {
            subject: 'Wagmatcook | Temporary Password',
            html: getFullTemplate(data, `
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
            `)
        }
    },
    sendOtp(data) {

        return {
            subject: 'Wagmatcook | One Time Password',
            html: getFullTemplate(data, `
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
            `)
        }
    },

    inviteUser(data) {
        return {
            subject: 'Wagmatcook | Invitation to signup',
            html: getFullTemplate(data, `
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
                `)
        }
    },
    welcome(data) {
        return {
            subject: 'Wagmatcook | Welcome',
            html: `
            
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Wagmatcook</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;900&display=swap");
        .container {
            width: 100%;
            display: flex;
            /* align-items: center; */
            justify-content: center;
        }

        .template-container {
            width: 700px;
        }

        .header {
            padding: 36px 50px 0px 50px;
            background: #093fe1;
            /* height: 552px; */
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
        }

        .leave-header {
            padding: 36px 50px 48px 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
        }

        .header-reset {
            padding: 36px 50px 48px 50px;
            background: #093fe1;
            /* height: 552px; */
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 30px;
        }

        .otp {
            color: #222b45;
            font-family: Inter;
            font-size: 64px;
            font-style: normal;
            font-weight: 500;
            line-height: 60px;
            margin: 20px 0px;
        }

        .underline {
            text-decoration-line: underline;
        }

        .reset-para {
            width: 100%;
            color: #222b45;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px;
            margin: 0px;
        }

        .leave-span {
            color: #222b45;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 32px;
            margin: 0px;
        }

        .header-logo {
            color: #fff;
            font-family: Inter;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.48px;
            width: 100%;
        }

        .header-leave-logo {
            color: #093fe1;
            font-family: Inter;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.48px;
            width: 100%;
        }

        .header-heading {
            color: #fff;
            text-align: center;
            font-family: Inter;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            /* 150% */
            letter-spacing: -0.64px;
            width: 80%;
        }

        .header-leave-heading {
            color: #222b45;
            text-align: center;
            font-family: Inter;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            /* 150% */
            letter-spacing: -0.64px;
            text-align: center;
            font-family: Inter;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 48px;
            /* 150% */
            letter-spacing: -0.64px;
            width: 80%;
        }

        .icon-leave {
            width: 152px;
            height: 152px;
            background-color: #eef2ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .main {
            /* height: 500px; */
            padding: 40px 50px 0px 50px;
            display: flex;
            /* align-items: center; */
            /* justify-content: center; */
            flex-direction: column;
        }

        .border {
            padding-bottom: 60px;
            border-bottom: 1px solid #eaeaea;
        }

        .border-reset {
            padding-bottom: 50px;
            border-bottom: 1px solid #eaeaea;
        }

        .banner {
            border-radius: 8px;
            background: #bde0e6;
            display: flex;
            padding: 20px 0px;
            align-items: center;
            gap: 20px;
            margin: 20px 0px 40px 0px;
        }

        .image {
            width: 30%;
        }

        .text-container {
            width: 70%;
        }

        .btn {
            border-radius: 8px;
            background: #fff;
            color: #050505;
            text-align: center;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 16px;
            padding: 0.8em 1.25em;
            border: none;
        }

        .main-heading {
            width: 100%;
            color: #222b45;
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 32px;
            margin: 0;
        }

        .main-para {
            color: #222b45;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px;
        }

        .grid {
            width: 100%;
            display: grid;

            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-gap: 30px;
            align-items: start;
        }

        .card {
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-row-gap: 8px;
            grid-column-gap: 16px;
        }

        .icon {
            grid-row: 1 / span 2;
            transform: translateY(-8px);
            width: 49px;
            height: 49px;
            background-color: #eef2ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .main-heading-2 {
            color: #222b45;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 28px;
            margin: 0px;
            align-items: center;
        }

        .card-para {
            color: #222b45;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px;
            margin: 0;
        }

        .footer {
            padding: 36px 0px 18px 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
        }

        .icons-container {
            display: flex;
            gap: 10px;
        }

        .footer-text {
            color: #6b6b6b;
            text-align: center;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            /* line-height: 28px; */
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 10px;
            /* margin-bottom:36px; */
        }

        .para {
            color: #8f939c;
            text-align: center;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            /* line-height: 28px; */
        }

        .color {
            color: #279af1;
        }

        .copyrights {
            color: #8f939c;
            text-align: center;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            /* line-height: 28px; */
        }

        .btn-blue {
            margin-top: 35px;
            color: #fff;
            text-align: center;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 16px;
            border: none;
            border-radius: 8px;
            background: #279af1;
            padding: 0.75em 1.25em;
        }

        @media screen and (max-width: 650px) {
            .header {
                padding: 10px 10px 0px 10px;


                gap: 15px;
            }

            .leave-header {
                /* padding: 20px 20px 20px 20px; */
                padding: 10px;

                gap: 15px;
            }

            .header-reset {
                /* padding: 20px 20px 20px 20px; */
                padding: 10px;

                gap: 25px;
            }

            .main {
                /* height: 500px; */
                /* padding: 40px 50px 0px 50px; */
                padding: 10px 10px 0px 10px;
            }

            .header-heading {
                color: #fff;
                text-align: center;
                font-family: Inter;
                font-size: 22px;
                font-style: normal;
                font-weight: 600;
                line-height: 38px;
                /* 150% */

                width: 100%;
            }
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="template-container">
        <div class="header">
        <p class="header-logo">Wagmatcook</p>
        <div class="header-heading">
            Welcome to Wagmatcook! We're thrilled to have you join us.
        </div>

        <image style="height: 180px;" src="https://hrapi.chantsit.com/public/welcome.png">
    </div>
    <div class="main">
        <div class="border">


        <h1 class="main-heading">Hi Jason Porter!</h1>
        <p class="main-para ">
            Welcome to Wagmatcook! It provide you access of leaves, events, and
            other compensation-related information right from your desk. Your
            user ID is 0215.
        </p>
        <p class="main-para">Here's what's in store for you:</p>
        <div class="grid">
            <div class="card">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">
                        <path opacity="0.5"
                            d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4"
                            stroke="#093FE1" stroke-width="1.5" />
                        <path
                            d="M12 11.6913L11.4813 12.2331C11.7713 12.5108 12.2287 12.5108 12.5187 12.2331L12 11.6913ZM12 15.8276L12 15.0776L12 15.8276ZM11.4865 14.7609C11.0686 14.4542 10.6081 14.0712 10.2595 13.6681C9.89122 13.2423 9.75 12.9113 9.75 12.6967H8.25C8.25 13.4666 8.6912 14.1479 9.1249 14.6493C9.57819 15.1735 10.1391 15.6327 10.5992 15.9703L11.4865 14.7609ZM9.75 12.6967C9.75 12.1207 10.0126 11.87 10.2419 11.7896C10.4922 11.7019 10.9558 11.7299 11.4813 12.2331L12.5187 11.1496C11.6943 10.3603 10.6579 10.0543 9.74566 10.3741C8.81245 10.7012 8.25 11.5995 8.25 12.6967H9.75ZM13.4008 15.9703C13.8609 15.6327 14.4218 15.1735 14.8751 14.6493C15.3088 14.1479 15.75 13.4666 15.75 12.6967H14.25C14.25 12.9113 14.1088 13.2423 13.7405 13.6681C13.3919 14.0713 12.9314 14.4542 12.5135 14.7609L13.4008 15.9703ZM15.75 12.6967C15.75 11.5995 15.1875 10.7012 14.2543 10.3741C13.3421 10.0543 12.3057 10.3603 11.4813 11.1496L12.5187 12.2331C13.0442 11.7299 13.5078 11.7019 13.7581 11.7896C13.9874 11.87 14.25 12.1207 14.25 12.6967H15.75ZM10.5992 15.9703C10.9678 16.2407 11.3816 16.5775 12 16.5776L12 15.0776C11.9756 15.0776 11.9605 15.0775 11.9061 15.0488C11.8202 15.0034 11.7128 14.9269 11.4865 14.7609L10.5992 15.9703ZM12.5135 14.7609C12.2872 14.9269 12.1798 15.0034 12.0939 15.0488C12.0395 15.0775 12.0244 15.0776 12 15.0776L12 16.5776C12.6184 16.5776 13.0322 16.2407 13.4008 15.9703L12.5135 14.7609Z"
                            fill="#093FE1" />
                        <path
                            d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                            stroke="#093FE1" stroke-width="1.5" />
                    </svg>
                </div>
                <h2 class="main-heading-2">Personalised Plans</h2>
                <p class="card-para">
                    Tailored training that fits your skills and goals.
                </p>
            </div>
            <div class="card">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">
                        <path
                            d="M18.18 8.03933L18.6435 7.57589C19.4113 6.80804 20.6563 6.80804 21.4241 7.57589C22.192 8.34374 22.192 9.58868 21.4241 10.3565L20.9607 10.82M18.18 8.03933C18.18 8.03933 18.238 9.02414 19.1069 9.89309C19.9759 10.762 20.9607 10.82 20.9607 10.82M18.18 8.03933L13.9194 12.2999C13.6308 12.5885 13.4865 12.7328 13.3624 12.8919C13.2161 13.0796 13.0906 13.2827 12.9882 13.4975C12.9014 13.6797 12.8368 13.8732 12.7078 14.2604L12.2946 15.5L12.1609 15.901M20.9607 10.82L16.7001 15.0806C16.4115 15.3692 16.2672 15.5135 16.1081 15.6376C15.9204 15.7839 15.7173 15.9094 15.5025 16.0118C15.3203 16.0986 15.1268 16.1632 14.7396 16.2922L13.5 16.7054L13.099 16.8391M13.099 16.8391L12.6979 16.9728C12.5074 17.0363 12.2973 16.9867 12.1553 16.8447C12.0133 16.7027 11.9637 16.4926 12.0272 16.3021L12.1609 15.901M13.099 16.8391L12.1609 15.901"
                            stroke="#093FE1" stroke-width="1.5" />
                        <path d="M8 13H10.5" stroke="#093FE1" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 9H14.5" stroke="#093FE1" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 17H9.5" stroke="#093FE1" stroke-width="1.5" stroke-linecap="round" />
                        <path opacity="0.5"
                            d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                            stroke="#093FE1" stroke-width="1.5" />
                    </svg>
                </div>
                <h2 class="main-heading-2">Instant Feedback</h2>
                <p class="card-para">
                    Improve your technique with real-time analysis.
                </p>
            </div>
            <div class="card">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">
                        <path
                            d="M4 11H16C17.8856 11 18.8284 11 19.4142 11.5858C20 12.1716 20 13.1144 20 15V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V11Z"
                            stroke="#093FE1" stroke-width="1.5" />
                        <path
                            d="M4.00153 10.9997C3.51773 9.19412 3.27584 8.29135 3.48389 7.51489C3.62019 7.00622 3.88798 6.5424 4.26035 6.17003C4.82875 5.60162 5.73152 5.35973 7.53706 4.87593L14.54 2.99949C15.2133 2.8191 15.5499 2.72891 15.8447 2.70958C17.0555 2.63022 18.1949 3.28804 18.7315 4.37629C18.8622 4.64129 18.9524 4.97791 19.1328 5.65114C19.1929 5.87556 19.223 5.98776 19.2295 6.08604C19.2559 6.48964 19.0366 6.86943 18.6739 7.04832C18.5855 7.09188 18.4733 7.12195 18.2489 7.18208L4.00153 10.9997Z"
                            stroke="#093FE1" stroke-width="1.5" />
                        <path opacity="0.5" d="M14.7004 2.94159L14.0627 8.28886" stroke="#093FE1"
                            stroke-width="1.5" stroke-linecap="round" />
                        <path opacity="0.5" d="M8.42184 4.62372L7.78409 9.97099" stroke="#093FE1"
                            stroke-width="1.5" stroke-linecap="round" />
                        <path opacity="0.5"
                            d="M14 16.5C14 16.0778 13.6028 15.793 12.8084 15.2235C12.0031 14.6462 11.6005 14.3575 11.3002 14.5695C11 14.7814 11 15.3543 11 16.5C11 17.6457 11 18.2186 11.3002 18.4305C11.6005 18.6425 12.0031 18.3538 12.8084 17.7765C13.6028 17.207 14 16.9222 14 16.5Z"
                            stroke="#093FE1" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </div>
                <h2 class="main-heading-2"> Expert Videos</h2>
                <p class="card-para">
                    Learn from the pros with our video lessons.
                </p>
            </div>
            <div class="card">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">
                        <path opacity="0.5"
                            d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                            stroke="#093FE1" stroke-width="1.5" />
                        <path d="M7 18V9" stroke="#093FE1" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M12 18V6" stroke="#093FE1" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M17 18V13" stroke="#093FE1" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </div>
                <h2 class="main-heading-2">Track Your Progress</h2>
                <p class="card-para">
                    Watch yourself evolve and celebrate milestones.
                </p>
            </div>
        </div>
    </div>
</div>
<div class="footer">
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
</div>
        </div>
    </div>
</body>

</html>
            `
        }
    }
}


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

//         .main-para {
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

//     <div class="container">
//         <div class="template-container">
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
               `

}
module.exports = emailTemplates