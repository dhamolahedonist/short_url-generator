import express from "express"
import ShortUrl from '../models/shortUrl'
import  QRCode  from "qrcode"


export const renderUrl = async (request:express.Request, response:express.Response) => {
    const shortUrls = await ShortUrl.find({
      user: request.user
    })
    response.render('index', { shortUrls: shortUrls} )

}


export const genShortUrl =  async  (request:express.Request,response:express.Response) => {
        await ShortUrl.create({ full: request.body.fullUrl, user: request.user})
        response.redirect('/users/home')
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

export const deleteLink = async (request: express.Request, response: express.Response) => {
 const itemId = request.params.id
try {
    // Delete the item from the database
    await ShortUrl.findByIdAndDelete(itemId);
    response.json({ success: true });
  } catch (error) {
    console.error('An error occurred while deleting the item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }

};


