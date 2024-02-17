// const UserRepository = require('../repository/UserRepository')
const UserService = require("./userService");
const security = require('../src/utils/security')


exports.verifyToken = async (req, res, next) =>{
    let nonce = req.headers['authorization'];
    const TOKEN_EXPIRED_OR_INVALID_PASSWORD = "TOKEN_EXPIRED_OR_INVALID_PASSWORD" // USED IN APP.
    if (nonce){
        nonce = nonce.replace("\"", "")
        nonce = nonce.replace("\"", "")
        let decodedNonce = await security.decodeToken(nonce)
        if (decodedNonce && decodedNonce.email){
            let params = {}
            params.username = decodedNonce.email
            let user = await UserService.getUserByEmail(params)
            if (!user)
            res.status(403).json({
                success: false,
                message: TOKEN_EXPIRED_OR_INVALID_PASSWORD,
              });
            else
                next()
        }
        else
        res.status(403).json({
            success: false,
            message: TOKEN_EXPIRED_OR_INVALID_PASSWORD,
          });

    }
    else
        res.sendStatus(403)
}