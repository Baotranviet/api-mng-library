let raiseErr = async (req) => {
    let errors = await req.getValidationResult();
    if (!errors.isEmpty()) {
      let err = errors.array();
      let firstError = err.map(error => error.msg)[0];
      return firstError
    }
    return null;
  }

let borrowerValidator = async (req) => {
    req.check('card_number', 'card number is required.').not().isEmpty();
    req.check('name', 'name is required.').not().isEmpty();
    req.check('day_of_birth', 'day of birth is required.').not().isEmpty();
    req.check('day_of_birth', 'Invalid birthday').toDate();
    req.check('class', 'class is required.').not().isEmpty();

    //check for errors
    return await raiseErr(req);
}

module.exports = {
    borrowerValidator,
};