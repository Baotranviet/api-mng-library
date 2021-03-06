let express = require("express");
let router = new express.Router();

let {register, isLogging, signIn} = require("./userServices");
let {registerValidator, loginValidator} = require("./userValidator");

router.post("/register", async (req, res, next) => {
  try {
    let validator = await registerValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    } else {
      let registed = await register(req.body);
      if (registed == true) {
        return res.send({message: "Register successfully."});
      } else {
        return res.send({message: "Email has been used."});
      }
    }    
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let isLogged = await isLogging(req);
    if (isLogged === true) {
      return res.send({message: "You are logged in."});
    }
    let validator = await loginValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let signIned = await signIn(req);
    if (signIned === false) {
      return res.send({message: "Email or Password is incorrect"});
    } else {
      return res.send({message: "Sign In successfully."});
    }
  } catch (err) {
    return res.status(500).send({error: err});
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    let isLogged = await isLogging(req);
    if (isLogged === false) {
      return res.send({message: "You are not logged in"});
    }
    req.session.user = null;
    return res.send({message: "Sign Out successfully"});
  } catch (error) {
    return res.status(500).send({error: error});
  }
})

module.exports = router;