import express from "express"
import ShortUrl from '../models/shortUrl'
import  QRCode  from "qrcode"
import url from 'url'



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


export const genQrCode = async (request: express.Request, response: express.Response) => {
  const inputText = request.body.text;
  
  if (!isValidUrl(inputText)) {
    const errorMessage = 'Invalid URL';
    return response.render('error', { errorMessage });
  }
  
  QRCode.toDataURL(inputText, (err, src) => {
    response.render('scan', {
      qr_code: src
    });
  });
};

function isValidUrl(text: any){
    try{
        const urlObj = new URL(text)
        return true
    }catch(error){
        return false
    }

}





