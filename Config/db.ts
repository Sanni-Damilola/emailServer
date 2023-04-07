import mongoose from "mongoose";







const mongodbLifeUrl = "mongodb+srv://sannidatabase:sannidatabase@cluster0.zh68ie9.mongodb.net/?retryWrites=true&w=majority"




const dbConfig = async () => {
  try {
    const connectUrl = await mongoose.connect(
      mongodbLifeUrl,
    );
    console.log("Connected To DataBase");
    console.log("");
    if (mongoose.connection.host === "local host") {
      console.log("You're Connected to LocalHost");
    }
    console.log("You're Connected To Cloud Host");
  } catch (error) {
    console.log("An Error Occured In DataBase", error);
  }
};

export default dbConfig;