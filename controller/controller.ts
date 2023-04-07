import { Request, Response } from "express";
import userModel from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const createUser = await userModel.create(
      {
        name,
        email,
        password,
      },
      { timestamps: true }
    );
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
    const getUser = await userModel.findById(req.body);
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
