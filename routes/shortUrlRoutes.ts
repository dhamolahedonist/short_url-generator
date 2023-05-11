import express from "express"
import { genShortUrl, getShortUrl, renderUrl } from "../controllers/shortUrlControllers"

const shortRoute = express.Router()
shortRoute.get('/', renderUrl) 
shortRoute.post('/shortUrls', genShortUrl)   
shortRoute.get('/:shortUrl', getShortUrl) 

export default shortRoute;