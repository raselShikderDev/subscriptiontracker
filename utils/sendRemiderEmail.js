import dayjs from "dayjs";
import {
  emailTemplates
} from "./utils/emailTemplate.js";
import transporter from "./config/nodeMailer.js";

export const sendReminderEmail = async (to, type, subscription) => {
  if (!to || !type) {
    throw new Error("Missing required parameter");
  }

  const template = emailTemplates.find((t) => t.label === type);
  if (!template) {
    throw new Error("Invalid template type");
  }

  const mailInfo = {
    username: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate()).format("MMM, D, YYYY"),
    planName: subscription.name,
    paymentMehtod: subscription.paymentMehtod,
    price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
  };

  const subject = template.generateSubject(mailInfo);
  const message = template.generateBody(mailInfo);

  const emailOption = {
    email: process.env.EMAIL_ACCOUNT,
    to: to,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(emailOption, (err, info) => {
    if (err) return console.error("Sending reminders email is faild: ", err);
    console.log(`Reminder email has sent: ${info.message}`);
  });
};
