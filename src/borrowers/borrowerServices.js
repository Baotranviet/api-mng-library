let {Borrower} = require('../../models/borrower')

let findAllModel = async (model) => {
    return await model.findAll({
        attributes: {exclude: [""]}
    });
}

let findOneModel = async (model, id) => {
    return await model.findOne({
        attributes: {exclude: ["updated_at"]},
        where: {
            id: id,
        }
    });
}

let createBorrower = async (cardNumber, nameBorrower, dayOfBirth, classBorrower) => {
    let result = await Borrower.findOrCreate({
      where: {
        card_number: cardNumber,
        name: nameBorrower,
        day_of_birth: dayOfBirth,
        class: classBorrower
      }
    });
    return result[0];
  }

let getAllBorrower = async () => {
    let getAllBorrower = await findAllModel(Borrower);
    if (getAllBorrower === null) {
        return null;
    }
    return {
        borrower: getAllBorrower,
    }
}
let getBorrower = async (borrowerId) => {
    let getBorrower = await findOneModel(Borrower, borrowerId);
    if (getBorrower === null) {
        return null;
    }
    return {
        borrower: getBorrower,
    }
}

let updateBorrower = async (borrowerId, cardNumber, nameBorrower, dayOfBirth, classBorrower) => {
    let getBorrower = findOneModel(Borrower,borrowerId);
    if (getBorrower === null) {
        return null;
    }
    await Borrower.update({
        card_number: cardNumber,
        name: nameBorrower,
        day_of_birth: dayOfBirth,
        class: classBorrower
    }, {
        where: {
            id: borrowerId
        }
    })
    let result = await findOneModel(Borrower, borrowerId);
    return result;
}

let deleteBorrower = async (borrowerId) => {
    let getBorrower = await findOneModel(Borrower, borrowerId);
    if (getBorrower === null) {
        return null;
    }
    await Borrower.destroy({
        where: {
            id: borrowerId
        }
    })
    return {}
}

module.exports = {
    createBorrower,
    getAllBorrower,
    getBorrower,
    updateBorrower,
    deleteBorrower
}