import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/User";
import configurePassport from "../config/passport";

// Call the configurePassport function to set up passport configuration
configurePassport(passport);

const router = express.Router();

export const renderLogin = (req: Request, res: Response) => {
  res.render("login");
};

export const renderRegister = (req: Request, res: Response) => {
  res.render("register");
};

// Register handle
export const registerUser = (req: Request, res: Response) => {
  const { name, email, password, password2 } = req.body;
  // Rest of the registration logic
  let errors: { msg: string }[] = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Password do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can login"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

// Login handle
export const loginUser = (req: Request, res: Response, next: NextFunction) => { 
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
  });
};

export default router;
