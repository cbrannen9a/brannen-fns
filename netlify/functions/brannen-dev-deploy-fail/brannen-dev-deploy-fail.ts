import { Handler } from "@netlify/functions";
import sendMail, { getMailData } from "../send-email/send-email";

const handler: Handler = async (event, context) => {
  const mail = getMailData("error", {
    name: "Brannen Dev",
    url: "https://app.netlify.com/sites/celadon-hotteok-be58f9/overview",
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
