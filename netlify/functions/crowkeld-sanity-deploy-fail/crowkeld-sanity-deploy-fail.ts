import { Handler } from "@netlify/functions";
import sendMail from "../send-email/send-email";

const { ADMIN_EMAIL, SENDER_EMAIL } = process.env;

const handler: Handler = async (event, context) => {
  const html = `
  <h4>[DEPLOY FAILED] Crowkeld Sanity</h4>
  <p>Failed to deploy to Crowkeld Sanity ${new Date()}</p>
  <p>https://app.netlify.com/sites/crowkeld-sanity/overview</p>
  `;

  const mail = {
    to: ADMIN_EMAIL,
    from: SENDER_EMAIL || "",
    subject: `[Deploy Failed] Crowkeld Sanity`,
    html,
  };

  try {
    await sendMail(mail);
    return {
      statusCode: 200,
      body: "Message sent",
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};

export { handler };
