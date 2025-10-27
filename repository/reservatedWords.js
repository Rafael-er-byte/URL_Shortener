const db = require('../config/dbConnetion')

const exist = async function (word) {
    const sql = 'SELECT id FROM invalid_words WHERE LOCATE(word, ?)LIMIT 1';
    const [result] = await db.execute(sql, [word])
    return result
}

module.exports = exist