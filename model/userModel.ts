import mongoose from "mongoose";

interface Iuser {
  name: string;
  email: string;
  password: string;
  token: string;
  otp: string;
  verified: boolean;
}

interface userData extends Iuser, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model<userData>("emailServer", userModel);
