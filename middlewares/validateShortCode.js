const valiadateShortCodeService = require('../services/validateShortCodeService')

const valiadateShortCode = async function(req, res, next){
    try{
        const {shortCode} = req.body

        if(!shortCode || typeof shortCode !== 'string')return res.status(422).json({message:'INVALID SHORTCODE'}).end()
        if(shortCode.length >= 25)return res.status(422).json({message:'TOO LARGE SHORTCODE'}).end()
        if(shortCode.length <= 3)return res.status(422).json({message:'TOO SMALL SHORTCODE'}).end()

        function isCoherent(){
            let map = new Set()

            shortCode.split('').forEach(c => {
                map.add(c)
            });

            const len = map.size

            if(len <= 4 && shortCode.length > 8)return false
            return true
        }

        if(!isCoherent())return res.status(422).json({message:'INVALID SHORTCODE'}).end()
        
        const success = await valiadateShortCodeService(shortCode)
            
        next()
    }catch(error){
        if(error.message === 'NOT_ALLOWED_SHORTCODE')return res.status(403).json({message:'NOT ALLOWED SHORTCODE'}).end()
        throw error
    }
}

module.exports = valiadateShortCode
