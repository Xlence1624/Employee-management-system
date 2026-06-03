import { createTransport } from "nodemailer";



//Create transporter using SMTP
const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({to, subject, body}) => {
const response = await transporter.sendMail({
  from: process.env.SENDER_EMAIL,
  to,
  subject,
  html: body
})
return response;
}
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Loaded" : "Missing");


export default sendEmail;