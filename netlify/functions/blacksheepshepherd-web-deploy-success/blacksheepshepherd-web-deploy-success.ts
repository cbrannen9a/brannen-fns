import { Handler } from "@netlify/functions";
import sendMail, { getMailData } from "../send-email/send-email";

const handler: Handler = async (event, context) => {
  const mail = getMailData("success", {
    name: "Black Sheep Shepherd Web",
    url: "https://app.netlify.com/sites/admiring-volhard-995c25/overview",
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
