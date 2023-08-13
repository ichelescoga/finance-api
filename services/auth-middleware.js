// const UserRepository = require('../repository/UserRepository')
const UserService = require("./userService");
const security = require('../src/utils/security')


exports.verifyToken = async (req, res, next) =>{
    let nonce = req.headers['authorization'];
  
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
                message: "Esta accion esta prohibida, necesitas credenciales validas",
              });
            else
                next()
        }
        else
        res.status(403).json({
            success: false,
            message: "Esta accion esta prohibida, necesitas credenciales validas",
          });

    }
    else
        res.sendStatus(403)
}