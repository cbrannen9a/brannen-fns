import { Handler } from "@netlify/functions";
import sendMail from "../send-email/send-email";

const { ADMIN_EMAIL } = process.env;

const handler: Handler = async (event, context) => {
  const html = `
    <h4>[DEPLOY FAILED] Sanity Studio for Coffee Books and Cake</h4>
    <p>Failed to deploy Sanity Studio Coffee Books and Cake ${new Date()}</p>
    <p>https://app.netlify.com/sites/books-and-cake-blog-studio/overview</p>
    `;

  const mail = {
    to: ADMIN_EMAIL,
    from: "no-reply@netlify.com",
    subject: `[Deploy Failed] Sanity Studio - Coffee Books and Cake`,
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
