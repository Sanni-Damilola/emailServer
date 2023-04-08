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
    const createUser: any = await userModel.create(
      {
        name,
        email,
        password,
        otp,
        token,
      },
      { timestamps: true }
    );
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
