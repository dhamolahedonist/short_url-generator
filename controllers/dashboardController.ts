import { Request, Response } from "express";
import User from "../models/User";

export const renderWelcome = (req: Request, res: Response) => {
  res.render("welcome");
};

export const renderDashboard = (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user as User; // Cast req.user to the User type
    res.render("dashboard", {
      name: user.name,
    });
  } else {
    // Handle the case when req.user is undefined
    res.redirect("/users/login");
  }
};

