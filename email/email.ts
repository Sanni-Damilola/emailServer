import { google } from "googleapis";
import nodemailer from "nodemailer";
import { resetPassword } from "../controller/controller";

const google_id: string =
  "367762056277-jtls6icdrtvdrpu29988a4p41cebi5r8.apps.googleusercontent.com";
const google_secret: string = "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";
const google_refreshToken: string =
  "1//0438HcdvFoP0YCgYIARAAGAQSNwF-L9IrjgAfqFuy4QQtoyPwsKgJZNuJu4bcQs2dL4sO-MpIMg6kg1cgY-6SgciBT6H1C5pjoF4";
const google_redirectToken: string =
  "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(
  google_id,
  google_secret,
  google_redirectToken
);

export const verifyAccount = async (createUser: any) => {
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
        // accessToken: getToken?.token!,
        accessToken:
          "ya29.a0Ael9sCPE2Yqk3XupfkIIpFx5TtVm0qd6WxgLR5Yx0Pii8pbVGyQJ4M55k0aD3txFZHTarw7bEORVX4H_24EzMm7wdnDmYP4aJysHN6zExX_CS8olyxb5XKCEIxn-jS8nB5YNztcQFwP0LrAHK8pyZKmIZ1iPaCgYKAUISARASFQF4udJh5HkA0s6qbt0SVZGxsyn5nA0163",
      },
    });

    const mailerOptions = {
      from: "lyfCare <sannifortune11@gmail.com>", // sender address
      to: createUser?.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Verifiy Your Account", // plain text body
      html: `<b>Welcome ${createUser?.name} here is your OTP : ${createUser?.otp}
      <a href="http://localhost/2001/verified" >
      click to verified
      </a>
      </b>`, // html body
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

export const resetUserPassword = async (createUser: any) => {
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
        // accessToken: getToken?.token!,
        accessToken:
          "ya29.a0Ael9sCPRVIWsXO3xILArtR2DSocv_2-I6uQK_N1Oz3CV7sCknV4CNCww2dOGpKQrdD3_heBPI1k7W-lxepQGRDvfXa7JFoNqo0xPfStdjVHqtkDwWl5NneOq_jcfrj08n6U2OUp1RFkgxFyqcfRS0W4rFAL0aCgYKATESARASFQF4udJhiRDu3__VGfRCrZrn-S_8NA0163",
      },
    });

    const mailerOptions = {
      from: "lyfCare <sannifortune11@gmail.com>", // sender address
      to: createUser?.email, // list of receivers
      subject: "Reset your Passwod ✔", // Subject line
      text: `Reset Password Request`, // plain text body
      html: `<b>
      <a heref=localhost:2001/api/changepassword/${createUser?._id}/${createUser?.token}>click here</a>
      </b>`, // html body
    };

    transporter
      .sendMail(mailerOptions)
      .then(() => {
        console.log("Reset Password Email not Sent");
      })
      .catch((err) => {
        console.log("Email Not sent in resetUserPassword", err);
      });
  } catch (error) {
    console.log("An Error occured In resetUserPassword");
  }
};
