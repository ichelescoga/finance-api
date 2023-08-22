require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const createHttpError = require('http-errors');
const app = express()
const orderRouter = require('./router/order.router')
const accountRouter = require('./router/account.router')
const assetsRouter = require('./router/assets.router')
const sequelize = require('./components/conn_sqlz')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))



app.use('/orders/v1',orderRouter)
app.use('/account/v1',accountRouter)
app.use('/assets/v1',assetsRouter)
app.use(function(req,res,next){
    let json_res = {
        url:req.url,
        method: req.method,
        message:createHttpError(404).message
    }
    res.json(json_res)
    //next()
    //next();
})

const port = process.env.EXPOSED_PORT

app.listen(
    port, () => console.log(`App listening on port ${port}!`)
);