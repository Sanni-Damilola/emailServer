import { Request, Response } from "express";
import userModel from "../model/userModel";

export const getCreate = async (req: Request, res: Response) => {
  try {
    const { name, email, password, token, verified, otp } = req.body;
  } catch (error) {
    console.log("an Error occured in getCreate", error);
  }
};
