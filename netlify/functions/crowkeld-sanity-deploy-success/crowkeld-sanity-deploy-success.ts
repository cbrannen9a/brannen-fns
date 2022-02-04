import { Handler } from "@netlify/functions";
import sendMail from "../send-email/send-email";

const { ADMIN_EMAIL } = process.env;

const handler: Handler = async (event, context) => {
  const html = `
    <h4>[DEPLOY SUCCESS] Crowkeld Sanity</h4>
    <p>Successful deploy to Crowkeld Sanity ${new Date()}</p>
    <p>https://crowkeld.sanity.studio/dashboard</p>
    `;

  const mail = {
    to: ADMIN_EMAIL,
    from: "no-reply@netlify.com",
    subject: `[Deploy Success] Crowkeld Sanity`,
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
