import express, { Request, Response, Router } from "express";
import {
  renderLogin,
  renderRegister,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";
import {  renderUrl, getShortUrl } from "../controllers/shortUrlControllers"


const router: Router = express.Router();

router.get("/login", renderLogin);
router.get("/register", renderRegister);
// router.get("/dashboard", ensureAuthenticated, renderDashboard);
router.get('/home', renderUrl) 
router.post("/register", registerUser);
router.get('/:shortUrl', getShortUrl) 
router.post("/login", loginUser);
router.get("/logout", logoutUser);


export default router;
