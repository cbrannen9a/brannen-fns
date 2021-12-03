import sgMail from "@sendgrid/mail";
import process from "process";

const { SENDGRID_API_KEY } = process.env;

const sendMail = async (mail: sgMail.MailDataRequired) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  await sgMail.send(mail);
};

export default sendMail;
