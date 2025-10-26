const validator = require('validator')
const {sanitizeUrl} = require('@braintree/sanitize-url')

function verifyURL(req, res, next){
    try{
        const {url} = req.body

        if(!url)throw new Error('NOT_ITEM_PROVIDED')

        const safeUrl = sanitizeUrl(url)

        if(safeUrl.startsWith('javascript:'))throw new Error('INVALID_ITEM/DATA')
    
        const dangerousChar = /[<>"'`´]/
        if(dangerousChar.test(url))throw new Error('INVALID_ITEM/DATA')
         
        const verify = new URL(safeUrl)

        next()
    }catch(error){next(error)}
}

module.exports = verifyURL
