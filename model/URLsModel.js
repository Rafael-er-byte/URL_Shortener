const db = require('../config/dbConnetion')

const createShortCode = async function(original, shortenedLink, expirationDate){
    const sql = 'INSERT INTO link (original_link, shorted_link, expires_at) VALUES (?,?,?)'

    const [result] = await db.execute(sql, [original, shortenedLink, expirationDate])

    return result
}

const findShortCode = async function (shortCode) {
    const sql = 'SELECT id, original_link FROM link WHERE shorted_link = ?'

    const [result] = await db.execute(sql,[shortCode])

    return result
}

const updateShortCode = async function (original, shorted, id) {
    const sql = 'UPDATE link SET original_link = ?, shorted_link = ? WHERE id = ?'

    const [result] = await db.execute(sql, [original, shorted, id])

    return result
}

const deleteURL = async function (id) {
    const sql = 'DELETE FROM link WHERE id = ?'

    const [result] = await db.execute(sql,[id])

    return result
}

const getStats = async function (shortCode) {
    const sql = 'SELECT stats FROM link WHERE shorted_link = ?'
    
    const [result] = await db.execute(sql, [shortCode])
    
    return result
}

const getAllData = async function (shortCode) {
    const sql = 'SELECT id, original_link, is_blocked, expires_at, status, stats FROM link WHERE shorted_link = ?'
    const [result] = await db.execute(sql, [shortCode])
    return result
}

const modifyStatus = async function (shortCode, newStatus) {
    const sql = 'UPDATE link SET status = ? WHERE shorted_link = ?'
    const [result] = await db.execute(sql, [newStatus, shortCode])
    return result
}

const updateAccess = async function (shortCode, newTime, lastVisit, stats) {
    const sql = 'UPDATE link SET expires_at = ?, last_visit = ?, stats = ? WHERE shorted_link = ?'
    const [result] = await db.execute(sql, [newTime, lastVisit, stats, shortCode])
    return result
}

module.exports = {
    createShortCode, 
    findShortCode, 
    updateShortCode, 
    deleteURL, 
    getStats, 
    getAllData, 
    modifyStatus, 
    updateAccess
}
