import express, { Application, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"


export const appConfig = (app: Application) => {

    app.use(express.json()).use(cors()).use(morgan("dev"))


        .all("/", (req: Request, res: Response) => {
            return res.status(200).json({
            message: "Up and Running ❤✌💕✔"
        })
    })

}