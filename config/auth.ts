import { Request, Response, NextFunction } from "express";

interface FlashRequest extends Request {
  flash: any;
}

export const ensureAuthenticated = (
  req: FlashRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please log in to view the resource");
  res.redirect("/users/login");
};


