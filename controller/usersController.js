const UserService = require("../services/userService");

exports.createUser = async (req, res, next) => {
    try {
  
      let params = {};
      params.email = req.body.email;
      params.password = req.body.password;
  
      await UserService.create(params);
      res.status(200).json({
        succes: true,
        message: "User created successfully",
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "the data does not meet the expected standard.",
      });
    }
  };