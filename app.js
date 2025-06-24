const express  = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
require('dotenv').config()
const urlRouter = require('./routes/shortURLRoutes')
const erroHandler = require('./middlewares/errorMiddleware')
const path = require('path')
const setHeader = require('./middlewares/setHeader')
const redisConnection = require('./config/redisConfig')
const redis = redisConnection()

app.use(setHeader)

app.disable('x-powered-by')

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.use('/sh.io',urlRouter)

app.use(erroHandler)

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

https.createServer(options, app).listen(process.env.PORT, ()=>{
    console.log(`https server is listening on port: ${process.env.PORT}`)
})
