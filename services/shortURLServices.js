const {
    createShortCode,
    findShortCode,
    updateShortCode,
    deleteURL,
    getStats,
    getAllData,
    modifyStatus,
    updateAccess
} = require('../model/URLsModel')

const {expirationDate , compareDates, dateNow}= require('../utils/DateManagment')
const route = 'https://' + process.env.HOST + ':' + process.env.PORT + '/sh.io/'

const shortURLService = async function (url, shortCode) {
    try{
        let newURL = ''

        if(shortCode) {
            shortCode = shortCode.replace(/ /g, "-")
            newURL = shortCode
        }

        let expires_at = await expirationDate()

        const result = await createShortCode(url, shortCode, expires_at)

        if(!shortCode){

            let identifier = Buffer.from(result.toString()).toString('base64').replace(/=+$/, '')

            newURL = identifier

            let success = await updateShortCode(url, identifier, result.insertId)

            if(success.affectedRows === 0){
                await deleteURL(result.insertId)
                throw new Error('SOMETHING_WENT_WRONG')
            }
        }
        return route + newURL
        
    }catch(error){
        if(error.code === 'ER_DUP_ENTRY')throw new Error('DUPLICATE_ENTRY')
        else throw error
    }
}

const delURLService = async function (shortCode) {
    try{
        const result = await findShortCode(shortCode)
        if(result.length === 0){
        throw new Error('NOT_FOUND')}
        
        const success = await deleteURL(result[0].id)

        if(success.affectedRows === 0)throw new Error('SOMETHING_WENT_WRONG')
        return success.affectedRows
    }catch(error){
        throw error}
}

const updateURLService = async function (newUrl, shortCode) {
    try{
        const result = await findShortCode(shortCode)
        if(result.length === 0)throw new Error('NOT_FOUND')

        const success = await updateShortCode(newUrl, shortCode, result[0].id)
        if(success.affectedRows === 0)throw new Error('SOMETHING_WENT_WRONG')
        return success
    }catch(error){throw error}
}

const updateNameURLService = async function (shortCode, newShortCode) {
    try{
        const result = await findShortCode(shortCode)
        if(result.length === 0){
        throw new Error('NOT_FOUND')}

        if(newShortCode) newShortCode = newShortCode.replace(/ /g, "-")

        const success = await updateShortCode(result[0].original_link, newShortCode, result[0].id)
        if(success.affectedRows === 0)throw new Error('SOMETHING_WENT_WRONG')
        return route + newShortCode
    }catch(error){
        if(error.code === 'ER_DUP_ENTRY')throw new Error('DUPLICATE_ENTRY')
        else throw error
    }
}

const retrieveURLService = async function (shortCode) { 
    try{
        const result = await findShortCode(shortCode)
        if(result.length === 0) throw new Error('NOT_FOUND')
        return result[0].original_link
    }catch(error){throw error}
}

const getStatsService = async function (shortCode) {
    try{
        const result = await getStats(shortCode)
        if(result.length === 0) throw new Error('NOT_FOUND')
        return result[0].stats
    }catch(error){throw error}
}

const redirectService = async function (shortCode) {
    try{
        const result = await getAllData(shortCode)

        if(result.length === 0)throw new Error('NOT_FOUND')

        if(result[0].is_blocked)throw new Error('BLOCKED')

        if(result[0].status === 'EXPIRED' || result[0].status === 'DISABLE') throw new Error('GONE')

        if(compareDates(result[0].expires_at)){
            const success = await modifyStatus(shortCode, 'EXPIRED')
            throw new Error('GONE')
        }

        const expires_at = expirationDate()
        const lastVisit = dateNow()

        const isUpdated = await updateAccess(shortCode, expires_at, lastVisit, result[0].stats + 1)
        if(isUpdated.affectedRows === 0)throw new Error('SOMETHING_WENT_WRONG')

        return [result[0].id, result[0].original_link]
    }catch(error){
        throw error}
}

module.exports = {
    shortURLService, 
    delURLService, 
    updateURLService, 
    retrieveURLService,
    updateNameURLService,
    redirectService,
    getStatsService
}
