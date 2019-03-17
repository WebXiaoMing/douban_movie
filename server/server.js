const express = require('express')
const proxy = require('express-http-proxy')

const app = express()

app.use('/api', proxy('http://api.douban.com', {
    proxyReqPathResolver: function (req) {
        console.log(req.url)
        return req.url
    }
}))


app.get('/', function (req, res) {
   res.send('hello express')
})

app.listen(9527, function () {
   console.log('sucess')
})

