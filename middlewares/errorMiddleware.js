const path = require('path')

module.exports = function erroHandler(err, req, res, next){
    if(err.message === 'NOT_FOUND')return res.status(404).json({message:'NOT FOUND'}).end()
    else if(err.message === 'DUPLICATE_ENTRY')return res.status(409).json({message:'DUPLICATE ENTRY'}).end()
    else if(err.message === 'NOT_ITEM_PROVIDED')return res.status(401).json({message:'NOT ITEM PROVIDED'}).end()
    else if(err.message === 'BLOCKED')return res.status(423).json({message:'BLOCKED'}).end()
    else if(err.message === 'GONE')return res.status(410).sendFile(path.join(__dirname, '..', 'public', 'gone', 'gone.html'))
    else if(err.message === 'INVALID_ITEM/DATA')return res.status(422).json({message:'INVALID ITEM OR DATA'}).end()
    else return res.status(500).json({message:'SOMETHING WENT WRONG'}).end()
    next()
}