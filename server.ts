import express from "express"
import connectDB  from './config/db';
import dotenv from 'dotenv';
import shortRoute from "./routes/shortUrlRoutes"
import path from "path"
import rateLimit from "express-rate-limit"
import expressLayouts from "express-ejs-layouts"
import flash from "connect-flash"
import session from "express-session"
import passport from "passport"
import userRouter from "./routes/userRoutes"
import "./config/passport";





dotenv.config();
connectDB();



export const app:express.Application = express()

const hostname = Object(process.env.HOSTNAME)
const port: number = parseInt(process.env.PORT || '3000');

// Ejs
app.use(expressLayouts);
 app.use(express.json())
 app.set('view engine', 'ejs')

 
app.set("views", path.join(__dirname, "views"));
 app.use(express.urlencoded({ extended: false}))

 const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    handler: (request:express.Request, response:express.Response) =>{
        response.redirect('/')
    }
 })
// express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routes
 app.use(limiter)
 app.use('/', shortRoute)
 app.use("/users", userRouter);

export const server = app.listen(port, hostname, () => {
    console.log(`Express server is started at http://${hostname}: ${process.env.PORT}`)
})