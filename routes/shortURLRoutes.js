const express = require('express')
const router = express.Router()
const verifyUrl = require('../middlewares/verifyURL')
const verifyShortCode = require('../middlewares/validateShortCode')

const {
    createLinkControler, 
    delURLController, 
    updateURLController, 
    retrieveURLController, 
    updateNameURLController,
    getStatsController,
    redirectController
} = require('../controllers/shortURLController')

router.post('/', verifyUrl, verifyShortCode, createLinkControler)

router.post('/del/:shortcode', delURLController)

router.put('/upturl', verifyUrl, verifyShortCode, updateURLController)

router.put('/uptcode', verifyShortCode, updateNameURLController)

router.get('/retrieve/:shortcode', retrieveURLController)

router.get('/:shortcode', redirectController)

router.get('/stats/:shortCode', getStatsController)

module.exports = router

