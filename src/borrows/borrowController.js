let express = require("express");
let router = new express.Router();

let {
  createBorrow,
  getAllBorrow,
  getBorrow,
  updateBorrow,
  deleteBorrow,
} = require("./borrowServices");
let {borrowValidator} = require("./borrowValidator");

router.post("/", async (req, res, next) => {
  try {
    let cardNumber = req.body.card_number;
    let bookCode = req.body.book_code;
    let borrowDate = req.body.borrow_date;
    let payDate = req.body.pay_date;

    let validator = await borrowValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let result = await createBorrow(cardNumber,bookCode,borrowDate,payDate);
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
    let result = await getAllBorrow(req);
    if (result === null) {
      return res.status(404).send({message: "Not found Borrow"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.get("/:borrowId", async (req, res, next) => {
  try {
    let {borrowId} = req.params;
    let result = await getBorrow(borrowId);
    if (result === null) {
      return res.status(404).send({message: "Not found Borrow"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.put("/:borrowId", async (req, res, next) => {
    try {
      let {borrowId} = req.params;
      let cardNumber = req.body.card_number;
      let bookCode = req.body.book_code;
      let borrowDate = req.body.borrow_date;
      let payDate = req.body.pay_date;
  
      let validator = await borrowValidator(req);
      if (validator !== null) {
        return res.send({message: validator});
      }
  
      let result = await updateBorrow(borrowId, cardNumber, bookCode, borrowDate, payDate);
      if (result === null) {
        return res.status(404).send({message: "Not found Borrow"});
      }
      return res.send({
        message: "Update successfully.",
        data: result
      });
    } catch (error) {
        console.log(error);
      return res.status(500).send({error: error});
    }
  });

router.delete("/:borrowId", async (req, res, next) => {
  try {
    let {borrowId} = req.params;
    let result = await deleteBorrow(borrowId);
    if (result === null) {
      return res.status(404).send({message: "Not found Borrow"});
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