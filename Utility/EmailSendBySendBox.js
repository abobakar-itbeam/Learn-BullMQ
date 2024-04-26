import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const sendEmail = async (Email, subject, text) => {
  try {
    const email_content = {
      to: Email,
      from: "info@grouphomebiz.com",
      subject: subject,
      html: text,
    };
    const email = await sgMail.send(email_content);
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "email not sent");
    throw new Error(error)
  }
};
export default sendEmail;
