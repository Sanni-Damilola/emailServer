import mongoose from "mongoose";

const mongodbLocalUrl = "mongodb://127.0.0.1:27017/nodemailer";
// const mongodbLifeUrl =
//   "mongodb+srv://sannidatabase:sannidatabase@cluster0.zh68ie9.mongodb.net/?retryWrites=true&w=majority";

const dbConfig = async () => {
  try {
    const connectUrl = await mongoose.connect(mongodbLocalUrl);
    console.log("Connected To DataBase");
    console.log("");
    if (mongoose.connection.host === "127.0.0.1") {
      console.log("You're Connected to LocalHost");
    } else {
      console.log("You're Connected To Cloud Host");
    }
  } catch (error) {
    console.log("An Error Occured In DataBase", error);
  }
};

export default dbConfig;
