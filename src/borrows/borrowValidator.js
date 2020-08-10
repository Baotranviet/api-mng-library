let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
      let err = errors.array();
      let firstError = err.map(error => error.msg)[0];
      return firstError
    }
    return null;
  }

let borrowValidator = async (req) => {
    req.check('card_number', 'card number is required.').not().isEmpty();
    req.check('book_code', 'book code is required.').not().isEmpty();
    req.check('borrow_date', 'borrow date is required.').not().isEmpty();
    req.check('borrow_date', 'Invalid borrow date').toDate("dd-mm-YYYY");
    req.check('pay_date', 'pay date is required.').not().isEmpty();
    req.check('pay_date', 'Invalid pay date').toDate("dd-mm-YYYY");
    req.check('pay_date', 'The return date must be after the date the book is borrowed').isAfter(req.borrow_date);

    //check for errors
    return await raiseErr(req);
}

module.exports = {
    borrowValidator,
};