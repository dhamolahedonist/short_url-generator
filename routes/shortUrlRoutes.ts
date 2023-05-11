import express from "express"
import { genShortUrl, getShortUrl, renderUrl, genQrCode, deleteLink } from "../controllers/shortUrlControllers"

const shortRoute = express.Router()
shortRoute.get('/', renderUrl) 
shortRoute.post('/shortUrls', genShortUrl)   
shortRoute.get('/:shortUrl', getShortUrl) 
shortRoute.post('/scan', genQrCode) 
shortRoute.delete('/delete/:id', deleteLink)


export default shortRoute;