let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
      let err = errors.array();
      let firstError = err.map(error => error.msg)[0];
      return firstError
    }
    return null;
  }

let bookValidator = async (req) => {
    req.check('book_code', 'book code is required.').not().isEmpty();
    req.check('book_name', 'book name is required.').not().isEmpty();
    req.check('page_number', 'page number is required.').not().isEmpty();
    req.check('quantity', 'quantity is required.').not().isEmpty();
    req.check('author_id', 'author id is required.').not().isEmpty();

    //check for errors
    return await raiseErr(req);
}

module.exports = {
    bookValidator,
};