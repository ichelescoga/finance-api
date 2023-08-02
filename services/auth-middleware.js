// const UserRepository = require('../repository/UserRepository')
const UserService = require("./userService");
const security = require('../src/utils/security')


exports.verifyToken = async (req, res, next) =>{
    let nonce = req.headers['authorization'];
    console.log(nonce)
  
    if (nonce){
        nonce = nonce.replace("\"", "")
        nonce = nonce.replace("\"", "")
        let decodedNonce = await security.decodeToken(nonce)
        if (decodedNonce && decodedNonce.email){
            let params = {}
            params.username = decodedNonce.email
            console.log(decodedNonce);
            let user = await UserService.getUserByEmail(params)
            console.log(user);
            if (!user)
                res.sendStatus(403)
            else
                next()
        }
        else
            res.sendStatus(403)

    }
    else
        res.sendStatus(403)
}