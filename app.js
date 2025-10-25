const express  = require('express')
const app = express()
require('dotenv').config()
const urlRouter = require('./routes/shortURLRoutes')
const erroHandler = require('./middlewares/errorMiddleware')

app.disable('x-powered-by')

app.use(express.json())

app.use('/sh.io', urlRouter)

app.use(erroHandler)

app.listen(process.env.PORT, () => {
    console.log(`https server is listening on port: ${process.env.PORT}`)
})
