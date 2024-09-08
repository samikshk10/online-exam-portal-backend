"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function mailer() {
    if (process.env.NODE_ENV === "development") {
        // Transporter for development
        return nodemailer_1.default.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT, 10),
            auth: {
                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    else {
        return nodemailer_1.default.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT, 10),
            auth: {
                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
    }
}
const sendEmail = async (user, schedule, token) => {
    console.log(user?.email);
    const mailOptions = {
        to: user?.email,
        from: `"Online Exam" <${process.env.NODEMAILER_USERNAME}>`,
        subject: "Online Exam Link",
        html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h2 style="color: #333; margin: 0;">Greetings, ${user?.fullName || "Sir"}</h2>
        </div>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">
        Please use the below login credential to login for exam:
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Email:</strong> ${user?.email}
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Password:</strong> ${schedule?.password}
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">
          Your exam link is below:
        </p>
        <p style="text-align: center; padding: 20px;">
          <a href="${process.env.CLIENT_BASE_URL}/login?token=${token}" target="_self" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Click Here</a>
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.5; text-align: center;">
          This link is only valid for 1 day.
        </p>
      </div>
    `,
    };
    try {
        const response = await mailer().sendMail(mailOptions);
        console.log(response, "mail");
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map