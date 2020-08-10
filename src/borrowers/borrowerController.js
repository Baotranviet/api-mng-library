let express = require("express");
let router = new express.Router();

let {
  createBorrower,
  getAllBorrower,
  getBorrower,
  updateBorrower,
  deleteBorrower,
} = require("./borrowerServices");
let {borrowerValidator} = require("./borrowerValidator");

router.post("/", async (req, res, next) => {
  try {
    let cardNumber = req.body.card_number;
    let nameBorrower = req.body.name;
    let dayOfBirth = req.body.day_of_birth;
    let classBorrower = req.body.class;

    let validator = await borrowerValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let result = await createBorrower(cardNumber,nameBorrower,dayOfBirth,classBorrower);
    return res.send({
      message: "Create successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.get("/", async (req, res, next) => {
  try {
    let result = await getAllBorrower(req);
    if (result === null) {
      return res.status(404).send({message: "Not found Borrower"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.get("/:borrowerId", async (req, res, next) => {
  try {
    let {borrowerId} = req.params;
    let result = await getBorrower(borrowerId);
    if (result === null) {
      return res.status(404).send({message: "Not found Borrower"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.put("/:borrowerId", async (req, res, next) => {
    try {
      let {borrowerId} = req.params;
      let cardNumber = req.body.card_number;
      let nameBorrower = req.body.name;
      let dayOfBirth = req.body.day_of_birth;
      let classBorrower = req.body.class;
  
      let validator = await borrowerValidator(req);
      if (validator !== null) {
        return res.send({message: validator});
      }
  
      let result = await updateBorrower(borrowerId, cardNumber, nameBorrower, dayOfBirth, classBorrower);
      if (result === null) {
        return res.status(404).send({message: "Not found Borrower"});
      }
      return res.send({
        message: "Update successfully.",
        data: result
      });
    } catch (error) {
      return res.status(500).send({error: error});
    }
  });

router.delete("/:borrowerId", async (req, res, next) => {
  try {
    let {borrowerId} = req.params;
    let result = await deleteBorrower(borrowerId);
    if (result === null) {
      return res.status(404).send({message: "Not found Borrower"});
    }
    return res.send({
      message: "Delete successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

module.exports = router;