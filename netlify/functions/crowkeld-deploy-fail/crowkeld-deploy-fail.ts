import { Handler } from "@netlify/functions";
import sendMail, { getMailData } from "../send-email/send-email";

const handler: Handler = async (event, context) => {
  const mail = getMailData("error", {
    name: "Crowkeld",
    url: "https://app.netlify.com/sites/affectionate-heisenberg-9b3df2/overview",
  });

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
