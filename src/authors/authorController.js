let express = require("express");
let router = new express.Router();

let {
  createAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require("./authorServices");
let {authorValidator} = require("./authorValidator");

router.post("/", async (req, res, next) => {
  try {
    let nameAuthor = req.body.name;

    let validator = await authorValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let result = await createAuthor(nameAuthor);
    return res.send({
      message: "Create successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.get("/:authorId", async (req, res, next) => {
  try {
    let {authorId} = req.params;
    let result = await getAuthor(authorId);
    if (result === null) {
      return res.status(404).send({message: "Not found Author"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
});

router.put("/:authorId", async (req, res, next) => {
    try {
      let {authorId} = req.params;
      let nameAuthor = req.body.name;
  
      let validator = await authorValidator(req);
      if (validator !== null) {
        return res.send({message: validator});
      }
  
      let result = await updateAuthor(authorId, nameAuthor);
      if (result === null) {
        return res.status(404).send({message: "Not found Author"});
      }
      return res.send({
        message: "Update successfully.",
        data: result
      });
    } catch (error) {
      return res.status(500).send({error: error});
    }
  });

router.delete("/:authorId", async (req, res, next) => {
  try {
    let {authorId} = req.params;
    let result = await deleteAuthor(authorId);
    if (result === null) {
      return res.status(404).send({message: "Not found Author"});
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