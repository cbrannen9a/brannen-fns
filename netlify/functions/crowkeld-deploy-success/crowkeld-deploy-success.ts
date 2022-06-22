import { Handler } from "@netlify/functions";
import sendMail from "../send-email/send-email";

const { ADMIN_EMAIL, SENDER_EMAIL } = process.env;

const handler: Handler = async (event, context) => {
  const html = `
    <h4>[DEPLOY SUCCESS] Crowkeld</h4>
    <p>Successful deploy to Crowkeld ${new Date()}</p>
    <p>https://app.netlify.com/sites/affectionate-heisenberg-9b3df2/overview</p>
    `;

  const mail = {
    to: ADMIN_EMAIL,
    from: SENDER_EMAIL || "",
    subject: `[Deploy Success] Crowkeld`,
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
