const {
    shortURLService, 
    delURLService, 
    updateURLService, 
    retrieveURLService,
    updateNameURLService,
    redirectService,
    getStatsService
} = require('../services/shortURLServices')

const path = require('path')

const createLinkControler = async function(req, res, next){
    try{
        const {url, shortCode = ''} = req.body

        let shortedURL = await shortURLService(url, (shortCode === '')? null: shortCode)

        return res.status(201).json({message:'URL SHORTED SUCCESSFULLY', shortURL: shortedURL}).end()

    }catch(error){next(error)}
}

const delURLController = async function (req, res, next) {
    try{
        const shortCode = req.params.shortcode

        if(!shortCode)throw new Error('NOT_ITEM_PROVIDED')

        const success = await delURLService(shortCode)

        return res.status(200).json({message:'URl DELETED SUCCESSFULLY'}).end()

    }catch(error){next(error)}
}

const updateURLController = async function (req, res, next) {
    try{
     const {url, shortCode} = req.body

    if(!url || !shortCode)throw new Error('NOT_ITEM_PROVIDED')

    const success = await updateURLService(url, shortCode)

    return res.status(200).json({message:'URL UPDATED SUCCESSFULLY'}).end()

   }catch(error){next(error)}
}

const updateNameURLController = async function (req, res, next) {
    try{
        const {shortCode = null, newShortCode = null} = req.body

        if(!shortCode || !newShortCode)throw new Error('NOT_ITEM_PROVIDED')

        const newRoute = await updateNameURLService(shortCode, newShortCode)

        return res.status(200).json({message:'URL UPDATED SUCCESSFULLY!', newRoute: newRoute}).end()
    }catch(error){next(error)}
}

const retrieveURLController = async function (req, res, next) {
    try{
        const shortCode = req.params.shortcode

        if(!shortCode)throw new Error('NOT_ITEM_PROVIDED')

        const originalURL = await retrieveURLService(shortCode)

        return res.status(200).json({original_URL: originalURL}).end()
    }catch(error){next(error)}
}

const redirectController = async function (req, res, next) {
    try{
        const shortCode = req.params.shortcode

        const [id, target] = await redirectService(shortCode)

        const redirectTo = `/default/redirectDefault.html?to=${encodeURIComponent(target)}`

        return res.redirect(301, redirectTo)
    }catch(error){next(error)}
}

const getStatsController = async function (req, res, next){
    try{
        const {shortCode} = req.body
        if(!shortCode)throw new Error('NOT_ITEM_PROVIDED')

        const stats = await getStatsService(shortCode)

        return res.status(200).json({message: 'stats: ', stats: stats}).end()
    }catch(error){next(error)}
}

module.exports = {
    createLinkControler, 
    delURLController, 
    updateURLController, 
    retrieveURLController,
    updateNameURLController,
    getStatsController,
    redirectController
}
