require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const createHttpError = require('http-errors');
const app = express()
const orderRouter = require('./router/order.router')
const accountRouter = require('./router/account.router')
const assetsRouter = require('./router/assets.router')
const beecommRouter = require('./router/beecommRouter')
const entityRouter = require('./router/entity.router')
const listsRouter = require('./router/lists.router')
const solicitudRouter = require('./router/solicitud.router')
const sequelize = require('./components/conn_sqlz')
const entityRouterA = require('./router/entityA.router')
const solicitudRouterA = require('./router/solicituda.router')
const rangoRouter = require('./router/rango.router')

app.use(cors())
app.use(bodyParser.json({limit: process.env.FILE_MAX_LIMIT}))
app.use(bodyParser.urlencoded({
    extended:true
}))
//app.use(express.bodyParser({limit: '10mb'}));



app.use('/orders/v1',orderRouter)
app.use('/account/v1',accountRouter)
app.use('/assets/v1',assetsRouter)
app.use('/beecomm/v1',beecommRouter)
app.use('/entity/v1',entityRouter)
app.use('/lists/v1', listsRouter)
app.use('/solicitud/v1', solicitudRouter)
app.use('/entitya/v1',entityRouterA)
app.use('/solicituda/v1', solicitudRouterA)
app.use('/rango/v1', rangoRouter)
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