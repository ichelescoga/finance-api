"use strict";
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");

let generateToken = async (userCredential) => {
  let user = {
    email: userCredential.Correo,
  };
  const tokenGenerate = await jwt.sign(user, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return tokenGenerate;
};

let decodeToken  = async (tokenGenerate) => {
  let token = tokenGenerate.split(" ");
  const tokenRequest = token[1];

  try {
    let decoded = await jwt.verify(tokenRequest, secret);

    return decoded;
  } catch (error) {
    return undefined;
  }
};


module.exports = {
  generateToken,
  decodeToken
};
