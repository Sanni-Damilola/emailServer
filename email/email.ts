import { google } from "googleapis";
import nodemailer from "nodemailer";

const google_id: string =
  "367762056277-jtls6icdrtvdrpu29988a4p41cebi5r8.apps.googleusercontent.com";
const google_secret: string = "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";
const google_refreshToken: string =
  "1//04PwVfScRD8FeCgYIARAAGAQSNwF-L9IrmpYwe2jwCygCgdRSEF-gBJVA7vcwGAdo6ht9iZiWIGkQUJ90OumMMadvZetFH1oEtz0";
const google_redirectToken: string =
  "https://developers.google.com/oauthplayground";

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
        user: "sannifortune11@gmail.com",
        clientId: google_id,
        clientSecret: google_secret,
        refreshToken: google_refreshToken,
        accessToken: getToken?.token!,
      },
    });

    const mailerOptions = {
      from: "lyfCare <sannifortune11@gmail.com>", // sender address
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
