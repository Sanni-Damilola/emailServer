import { Request, Response } from "express";
import userModel from "../model/userModel";
import { verifyAccount } from "../email/email";
import crypto from "crypto";

export const deleteAllModel = async (req: Request, res: Response) => {
  const deleteAllModel = await userModel.deleteMany();
  return res.status(200).json({
    message: "Deleted All User " + (await userModel.find()).length,
  });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const otp = crypto.randomBytes(2).toString("hex");
    const token = crypto.randomBytes(32).toString("hex");
    const createUser = await userModel.create({
      name,
      email,
      password,
      otp,
      token,
    });

    const date = new Date();
    const getDate = date.toDateString();
    const getTIme = date.toLocaleTimeString();
    let dateAndTime = `Date: ${getDate} : Time ${getTIme}`;
    await userModel.findByIdAndUpdate(createUser?._id, {
      $push: {
        passwordData: `Password: ${createUser?.password} Time: ${dateAndTime}`,
      },
    });
    // date_and_time: dateAndTime
    // verifyAccount(createUser)
    //   .then(() => {
    //     console.log("Mail Sent");
    //   })
    //   .catch((error) => {
    //     console.log("Coludnt Send Mail", error);
    //   });
    return res.status(200).json({
      message: "Successfully created Uers",
      data: createUser,
    });
  } catch (error) {
    console.log("an Error occured in getCreate", error);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    return res.status(200).json({
      message: "Succefully gotten User",
      data: getUser,
    });
  } catch (error) {
    console.log("an Error occured in getOne", error);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  const getUser = await userModel.find();
  return res.status(200).json({
    message: "Succefully gotten All user",
    data: getUser,
  });
};

// verifiyUser
export const verifiyUser = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const { id } = req.params;

    const user = await userModel.findById(id);
    if (user?.otp === otp) {
      if (user?.token !== "") {
        await userModel.findByIdAndUpdate(
          id,
          {
            token: "",
            verified: true,
          },
          { new: true }
        );
      }
    } else {
      return res.status(400).json({
        mesage: "Wrong OTP",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log("An Error Occured occured in", error);
  }
};

// request reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const getUser = await userModel.findOne({ email });
    const token = crypto.randomBytes(32).toString("hex");

    if (getUser?.token === "" && getUser?.verified === true) {
      const userData = await userModel.findByIdAndUpdate(
        getUser?._id,
        { token: token },
        { new: true }
      );

      return res.json({
        message: "An Email as been sent to You",
      });
    } else {
      return res.json({ message: "Request Failed" });
    }
  } catch (error) {
    console.log("an Error Occured in reset Password", error);
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const getUser = await userModel.findById(id);

    if (getUser) {
      if (getUser?.token === "" && getUser?.verified == true) {
        if (getUser?.passwordData.includes(password)) {
          if (getUser?.passwordData.includes(password)) {
            return res.status(400).json({
              message: "Can't use Old Password",
            });
          }
        } else {
          const getUserAndUpdatePassword = await userModel.findByIdAndUpdate(
            getUser?._id,
            {
              password,
              token: "",
            },
            { new: true }
          );
          await userModel.findByIdAndUpdate(getUserAndUpdatePassword?._id, {
            $push: { passwordData: password },
          });

          return res.json({
            message: "Your password has been changed, SUCCESSFULLY!",
            data: getUserAndUpdatePassword,
          });
        }
      } else {
        return res.json({ message: "Couldnt't Change Password Try Again" });
      }
    } else {
      return res.json({ message: "Could'nt Get User" });
    }
  } catch (error) {
    console.log("An error occured in changeUserPassword", error);
  }
};
