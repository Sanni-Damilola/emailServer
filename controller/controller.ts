import { Request, Response } from "express";
import userModel from "../model/userModel";
import { verifyAccount } from "../email/email";
import crypto from "crypto";

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
