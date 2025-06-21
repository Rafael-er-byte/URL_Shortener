function dateNow(){
    const now = new Date()
    const currentTimeFormated = now.toISOString().slice(0,19).replace('T', ' ')
    return currentTimeFormated
}

function expirationDate(){
    try{
        const date = new Date()

        date.setDate(date.getDate() + 60)

        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ')

        return formattedDate
    }catch(error){
        throw new Error('SOMETHING_WENT_WRONG')
    }
}

function compareDates(date){
    const currentTimeFormated = dateNow()
    return new Date(currentTimeFormated) > new Date(date)
}

module.exports = {expirationDate, compareDates, dateNow}