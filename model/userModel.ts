import mongoose from "mongoose";

interface Iuser {
  name: string;
  email: string;
  password: string;
  token: string;
  otp: string;
  verified: boolean;
  passwordData: any[];
  dateAndTIme: any[];
}

interface userData extends Iuser, mongoose.Document {}

const userModel = new mongoose.Schema<Iuser>(
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
    otp: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    passwordData: [],
    dateAndTIme: [],
  },
  { timestamps: true }
);

export default mongoose.model<userData>("emailServer", userModel);
