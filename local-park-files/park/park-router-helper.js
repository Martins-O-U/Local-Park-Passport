const db = require('../../database/db-config')

const addPark = (user) => {
    return db("parkList").insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findParkById(id);
        })
}

const findParkById = id => {
    return db("parkList").where({id}).first();
}

const findParkBy = filter => {
    return db("parkList").where(filter);
}

const getParks = () => {
    return db("parkList");
}

const updatePark = (changed, id) => {
    return db('parkList')
      .where({ id }).update(changed);
  }
  
  const removePark = (id)  =>{
    return db('parklist')
        .where({id}).del();
  }

module.exports = {
    addPark,
    findParkById, 
    findParkBy,
    getParks,
    updatePark,
    removePark
}