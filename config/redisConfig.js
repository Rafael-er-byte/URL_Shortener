const Redis = require('ioredis')

async function redisConection() {
    
    const redis = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    })

    redis.on('connect', ()=>{
        console.log('Connected to redis')
    })

    redis.on('error', (err) => {
        console.error("Unable to connect to redis: ", err)
    })

    return redis
}

module.exports = redisConection
