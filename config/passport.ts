import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User";

export default function configurePassport(passport: any) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user: any) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          // Match the password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err: any) => console.log(err));
    })
  );

  //   login session
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

//   passport.deserializeUser((id: any, done: any) => {
//     User.findById(id, (err: any, user: any) => {
//       done(err, user);
//     });
//   });
// }
passport.deserializeUser((id: any, done: any) => {
  User.findById(id)
    .then((user: any) => {
      done(null, user);
    })
    .catch((err: any) => {
      done(err, null);
    });
});
}
