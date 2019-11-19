const db = require('../../database/db-config')

const addUsers = (user) => {
    return db("usersList").insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findUsersById(id);
        })
}

const findUsersById = id => {
    return db("usersList").where({id}).first();
}

const findUsersBy = filter => {
    return db("usersList").where(filter);
}

const getUsers = () => {
    return db("usersList");
}

const updateUser = (changed, id) => {
    return db('usersList')
      .where({ id }).update(changed);
  }
  
  const removeUser = (id)  =>{
    return db('userslist')
        .where({id}).del();
  }

module.exports = {
    addUsers,
    findUsersById, 
    findUsersBy,
    getUsers,
    updateUser,
    removeUser
}