let {Borrow} = require('../../models/borrow')

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

let createBorrow = async (cardNumber, bookCode, borrowDate, payDate) => {
    let result = await Borrow.findOrCreate({
      where: {
        card_number: cardNumber,
        book_code: bookCode,
        borrow_date: borrowDate,
        pay_date: payDate
      }
    });
    return result[0];
  }

let getAllBorrow = async () => {
    let getAllBorrow = await findAllModel(Borrow);
    if (getAllBorrow === null) {
        return null;
    }
    return {
        borrow: getAllBorrow,
    }
}
let getBorrow = async (borrowId) => {
    let getBorrow = await findOneModel(Borrow, borrowId);
    if (getBorrow === null) {
        return null;
    }
    return {
        borrow: getBorrow,
    }
}

let updateBorrow = async (borrowId, cardNumber, bookCode, borrowDate, payDate) => {
    let getBorrow = findOneModel(Borrow,borrowId);
    if (getBorrow === null) {
        return null;
    }
    await Borrow.update({
        card_number: cardNumber,
        book_code: bookCode,
        borrow_date: borrowDate,
        pay_date: payDate
    }, {
        where: {
            id: borrowId
        }
    })
    let result = await findOneModel(Borrow, borrowId);
    return result;
}

let deleteBorrow = async (borrowId) => {
    let getBorrow = await findOneModel(Borrow, borrowId);
    if (getBorrow === null) {
        return null;
    }
    await Borrow.destroy({
        where: {
            id: borrowId
        }
    })
    return {}
}

module.exports = {
    createBorrow,
    getAllBorrow,
    getBorrow,
    updateBorrow,
    deleteBorrow
}