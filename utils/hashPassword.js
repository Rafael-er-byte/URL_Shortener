const bcrypt = require('bcrypt')

async function hashPassword(password) {
    try{
        const saltRouds = 10
        const hashedPassword = await bcrypt.hash(password,saltRouds)
        return hashedPassword
    }catch(error){
        throw new Error('SOMETHING_WENT_WRONG')
    }
}

module.exports = hashPassword