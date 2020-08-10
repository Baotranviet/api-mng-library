let {Book} = require('../../models/book')

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

let createBook = async (bookCode, nameBook, pageNumber, quantity, authorId) => {
    let result = await Book.findOrCreate({
      where: {
        book_code: bookCode,
        book_name: nameBook,
        page_number: pageNumber,
        quantity: quantity,
        author_id: authorId
      }
    });
    return result[0];
  }

let getAllBook = async () => {
    let getAllBook = await findAllModel(Book);
    if (getAllBook === null) {
        return null;
    }
    return {
        book: getAllBook,
    }
}
let getBook = async (bookId) => {
    let getBook = await findOneModel(Book, bookId);
    if (getBook === null) {
        return null;
    }
    return {
        book: getBook,
    }
}

let updateBook = async (bookId, bookCode, nameBook, pageNumber, quantity, authorId) => {
    let getBook = findOneModel(Book,bookId);
    if (getBook === null) {
        return null;
    }
    await Book.update({
        book_code: bookCode,
        book_name: nameBook,
        page_number: pageNumber,
        quantity: quantity,
        author_id: authorId
    }, {
        where: {
            id: bookId
        }
    })
    let result = await findOneModel(Book, bookId);
    return result;
}

let deleteBook = async (bookId) => {
    let getBook = await findOneModel(Book, bookId);
    if (getBook === null) {
        return null;
    }
    await Book.destroy({
        where: {
            id: bookId
        }
    })
    return {}
}

module.exports = {
    createBook,
    getAllBook,
    getBook,
    updateBook,
    deleteBook
}