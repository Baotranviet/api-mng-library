let {Author} = require('../../models/author')

let findOneModel = async (model, id) => {
    return await model.findOne({
        attributes: {exclude: ["updated_at"]},
        where: {
            id: id,
        }
    });
}

let createAuthor = async (nameAuthor) => {
    let result = await Author.findOrCreate({
      where: {
        name: nameAuthor,
      }
    });
    return result[0];
  }

let getAuthor = async (authorId) => {
    let getAuthor = await findOneModel(Author, authorId);
    if (getAuthor === null) {
        return null;
    }
    return {
        author: getAuthor,
    }
}

let updateAuthor = async (authorId, nameAuthor) => {
    let getAuthor = findOneModel(Author,authorId);
    if (getAuthor === null) {
        return null;
    }
    await Author.update({
        name: nameAuthor
    }, {
        where: {
            id: authorId
        }
    })
    let result = await findOneModel(Author, authorId);
    return result;
}

let deleteAuthor = async (authorId) => {
    let getAuthor = await findOneModel(Author, authorId);
    if (getAuthor === null) {
        return null;
    }
    await Author.destroy({
        where: {
            id: authorId
        }
    })
    return {}
}

module.exports = {
    createAuthor,
    getAuthor,
    updateAuthor,
    deleteAuthor,
};