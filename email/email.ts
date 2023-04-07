import { google } from "googleapis";
import nodemailer from "nodemailer";

const google_id: string = "";
const google_secret: string = "";
const google_refreshToken: string = "";
const google_redirectToken: string = "";

const oAuth = new google.auth.OAuth2(
  google_id,
  google_secret,
  google_redirectToken
);

export const verifyAccount = async () => {
  try {
    oAuth.setCredentials({
      access_token: google_refreshToken,
    });

    const getToken = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        clientId: google_id,
        clientSecret: google_secret,
        refreshToken: google_refreshToken,
        accessToken: getToken?.token!,
      },
    });

    const mailerOptions = {
      from: "lyfCare", // sender address
      to: "sendEmail", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Welcome</b>`, // html body
    };

    transporter
      .sendMail(mailerOptions)
      .then(() => {
        console.log("Email Sent");
      })
      .catch((err) => {
        console.log("Email Not sent", err);
      });
  } catch (error) {
    console.log("An Error occured In verifyAccount");
  }
};
