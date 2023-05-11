import express from "express"
import ShortUrl from '../models/shortUrl'



export const renderUrl = async (request:express.Request,response:express.Response) => {
    const shortUrls = await ShortUrl.find()
    response.render('index', { shortUrls: shortUrls} )

}


export const genShortUrl =  async  (request:express.Request,response:express.Response) => {
        await ShortUrl.create({ full: request.body.fullUrl})
        response.redirect('/')
}

export const getShortUrl = async (request:express.Request,response:express.Response) => {
    const shortUrl = await ShortUrl.findOne({short: request.params.shortUrl})

    if(shortUrl === null) return response.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    response.redirect(shortUrl.full)
}





