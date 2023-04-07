import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/route";

export const appConfig = (app: Application) => {
  app
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))

    .use("/api", router)

    .get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        message: "Up and Running ❤✌💕✔",
      });
    })
    .all("*", (req: Request, res: Response) => {
      return res.status(404).json({
        message: `This Roue is not Found ${req.originalUrl}`,
      });
    });
};
