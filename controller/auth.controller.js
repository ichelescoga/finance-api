const UserService = require("../services/userService");

const security = require("../src/utils/security");


const crypto = require("crypto");
var secret_key = process.env.SECRET_KEY;
const iv = new Buffer(16);
iv.fill(0);
const algorithm = process.env.ALGORITHM;

// reusable function to decrypt
function decrypt(text) {
  let decipher = crypto.createDecipheriv(algorithm, secret_key, iv);
  let dec = decipher.update(text, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

exports.encript = async (req, res, next) => {
  try {
    const text = req.body.password;
    var cipher = crypto.createCipheriv(algorithm, secret_key, iv);
    var crypted = cipher.update(text, "utf8", "base64");
    crypted += cipher.final("base64");
    res.json(crypted);
  } catch (error) {
    console.log(error);
  }
};



// Controllers for login
exports.signIn = async (req, res, next) => {
  try {
    let userCredential = {};
    userCredential.email = req.body.email;
    userCredential.password = req.body.password;

    let results = await UserService.listlogin(userCredential);
    if (results == null || results == undefined) {
      res.status(400).json({
        success: false,
        message: "Incorrect username and/or password.",
        errorType: 1,
      });
    } else if (results == "HourLimit") {
      res.status(300).json({
        success: false,
        message:
          "A password change request was received, the code to log in has expired, request another one to log in.",
      });
    } else {
      let acccesToken = await security.generateToken(results);
      let resultsUser = await UserService.listUser(userCredential);
      res.json({
        message: "Successful authentication.",
        token: acccesToken,
        usuario: resultsUser
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Incorrect parameters.",
      errorType: 2,
    });
  }
};