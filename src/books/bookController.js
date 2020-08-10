let express = require("express");
let router = new express.Router();

let {
  createBook,
  getAllBook,
  getBook,
  updateBook,
  deleteBook,
} = require("./bookServices");
let {bookValidator} = require("./bookValidator");

router.post("/", async (req, res, next) => {
  try {
    let bookCode = req.body.book_code;
    let nameBook = req.body.book_name;
    let pageNumber = req.body.page_number;
    let quantity = req.body.quantity;
    let authorId = req.body.author_id;

    let validator = await bookValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let result = await createBook(bookCode,nameBook,pageNumber,quantity,authorId);
    return res.send({
      message: "Create successfully.",
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: error});
  }
});

router.get("/", async (req, res, next) => {
  try {
    let result = await getAllBook(req);
    if (result === null) {
      return res.status(404).send({message: "Not found Book"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.get("/:bookId", async (req, res, next) => {
  try {
    let {bookId} = req.params;
    let result = await getBook(bookId);
    if (result === null) {
      return res.status(404).send({message: "Not found Book"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.put("/:bookId", async (req, res, next) => {
    try {
      let {bookId} = req.params;
      let bookCode = req.body.book_code;
      let nameBook = req.body.book_name;
      let pageNumber = req.body.page_number;
      let quantity = req.body.quantity;
      let authorId = req.body.author_id;
  
      let validator = await bookValidator(req);
      if (validator !== null) {
        return res.send({message: validator});
      }
  
      let result = await updateBook(bookId, bookCode, nameBook, pageNumber, quantity, authorId);
      if (result === null) {
        return res.status(404).send({message: "Not found Book"});
      }
      return res.send({
        message: "Update successfully.",
        data: result
      });
    } catch (error) {
      return res.status(500).send({error: error});
    }
  });

router.delete("/:bookId", async (req, res, next) => {
  try {
    let {bookId} = req.params;
    let result = await deleteBook(bookId);
    if (result === null) {
      return res.status(404).send({message: "Not found Book"});
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