import sgMail from "@sendgrid/mail";
import process from "process";

const { SENDGRID_API_KEY, ADMIN_EMAIL, SENDER_EMAIL } = process.env;

const sendMail = async (mail: sgMail.MailDataRequired) => {
  sgMail.setApiKey(SENDGRID_API_KEY || "");

  await sgMail.send(mail);
};

export default sendMail;

export const getMailData = (
  type: "success" | "error" | "info",
  data: { name: string; url: string }
) => {
  const html = `
  <h4>[DEPLOY ${type.toUpperCase()}] ${data.name}</h4>
  <p>${type.toUpperCase()} deploy to ${data.name} ${new Date()}</p>
  <p>${data.url}</p>
  `;

  return {
    to: ADMIN_EMAIL,
    from: SENDER_EMAIL || "",
    subject: `[Deploy ${type}] ${data.name}`,
    html,
  };
};
