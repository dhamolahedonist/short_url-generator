import express from "express"
import { genShortUrl, getShortUrl, renderUrl, genQrCode, deleteLink } from "../controllers/shortUrlControllers"
import { ensureAuthenticated } from "../config/auth"
import { renderWelcome, renderDashboard } from "../controllers/dashboardController"

const shortRoute = express.Router()
shortRoute.get("/", renderWelcome);
shortRoute.get("/dashboard", ensureAuthenticated, renderDashboard);
shortRoute.get('/', renderUrl) 
shortRoute.post('/shortUrls', genShortUrl)   
shortRoute.get('/:shortUrl', getShortUrl) 
shortRoute.post('/scan', genQrCode) 
shortRoute.delete('/delete/:id', deleteLink)


export default shortRoute;