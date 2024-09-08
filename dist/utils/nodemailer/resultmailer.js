"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function ResultMailer() {
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
const sendEmail = async (user, result) => {
    const mailOptions = {
        to: user?.email,
        from: `"Online Exam" <${process.env.NODEMAILER_USERNAME}>`,
        subject: "Exam Result",
        html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h2 style="color: #333; margin: 0;">Greetings, ${user?.fullName || "Sir"}</h2>
        </div>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">
        Result for the exam is out. Please check your result below:
        </p>

        <p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Obtained Marks :</strong>${result?.obtainedMarks}/${result?.totalMarks}
        </p>

        ${result?.EasyCodeQuestionSolved !== null
            ? `<p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Easy Code Question Attempted :</strong> ${result?.EasyCodeQuestionSolved}
        </p>`
            : ""}

         ${result?.mediumHardCodeQuestionSolved !== null
            ? `<p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Medium or Hard Code Question Attempted :</strong> ${result?.mediumHardCodeQuestionSolved}
        </p>`
            : ""}

            <p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Attempted MCQ questions :</strong>${result?.attemptedMcqCount}
        </p>


        <p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Total Attempted Questions:</strong> ${result?.attemptedQuestionCount}
        </p>
          <p style="font-size: 16px; color: #333; line-height: 1.5;">
          <strong>Total Questions:</strong> ${result?.totalQuestionCount}
        </p>
     
      </div>
    `,
    };
    try {
        const response = await ResultMailer().sendMail(mailOptions);
        console.log(response, "mail");
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=resultmailer.js.map