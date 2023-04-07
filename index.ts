import express,{ Application } from 'express'
import { appConfig } from './app'
import dbConfig from './Config/db'


const port = 2001

const app: Application = express()
appConfig(app)
dbConfig()

app.listen(port, () => {
    console.log("Done on port", port);
    
})

