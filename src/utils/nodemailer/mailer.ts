import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";

interface User {
  email: string;
  id: number;
  fullName: string;
}

interface SendEmailParams {
  user: User;
  token?: string;
}

function mailer(): Transporter {
  if (process.env.NODE_ENV === "development") {
    // Transporter for development
    return nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST as string,
      port: parseInt(process.env.NODEMAILER_PORT as string, 10),
      auth: {
        user: process.env.NODEMAILER_USERNAME as string,
        pass: process.env.NODEMAILER_PASSWORD as string,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  } else {
    return nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST as string,
      port: parseInt(process.env.NODEMAILER_PORT as string, 10),
      auth: {
        user: process.env.NODEMAILER_USERNAME as string,
        pass: process.env.NODEMAILER_PASSWORD as string,
      },
    });
  }
}

interface ScheduleData {
  password: string;
}

const sendEmail = async (user: User, schedule: ScheduleData, token: string): Promise<void> => {
  console.log(user?.email);

  const mailOptions: SendMailOptions = {
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
    const response: SentMessageInfo = await mailer().sendMail(mailOptions);
    console.log(response, "mail");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { sendEmail };
