import express from "express"
import connectDB  from './db';
import dotenv from 'dotenv';
import shortRoute from "./routes/shortUrlRoutes"
import path from "path"
import rateLimit from "express-rate-limit"



dotenv.config();
connectDB();


export const app:express.Application = express()

const hostname = Object(process.env.HOSTNAME)
const port: number = parseInt(process.env.PORT || '3000');

 app.use(express.json())
 app.set('view engine', 'ejs')
 
app.set("views", path.join(__dirname, "views"));
 app.use(express.urlencoded({ extended: false}))

 const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    handler: (request, response) =>{
        response.redirect('/')
    }
 })

 app.use(limiter)
 app.use('/', shortRoute)

export const server = app.listen(port, hostname, () => {
    console.log(`Express server is started at http://${hostname}: ${process.env.PORT}`)
})