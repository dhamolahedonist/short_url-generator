import express from "express"
import connectDB  from './db';
import dotenv from 'dotenv';
import shortRoute from "./routes/shortUrlRoutes"


dotenv.config();
connectDB();

const app:express.Application = express()

const hostname = Object(process.env.HOSTNAME)
const port: number = parseInt(process.env.PORT || '3000');



 app.use(express.json())
 app.set('view engine', 'ejs')
 app.use(express.urlencoded({ extended: false}))

 app.use('/', shortRoute)

app.listen(port, hostname, () => {
    console.log(`Express server is started at http://${hostname}: ${process.env.PORT}`)
})