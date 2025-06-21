const exist = require('../model/reservatedWords')

const validateShortCodeService = async function (shortCode) {
    try{
        const result = await exist(shortCode)
        if(result.length >= 1)throw new Error('NOT_ALLOWED_SHORTCODE')
        return result
    }catch(error){throw error}
}

module.exports = validateShortCodeService
