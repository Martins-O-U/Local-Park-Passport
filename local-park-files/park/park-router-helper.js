const db = require('../../database/db-config')

const addPark = (user) => {
    return db("parkList").insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findParkById(id);
        })
}

const findParkById = id => {
    return db("parkList")
    .join("rating", "parkList.id", "rating.park_id")
    .where({park_id: id}).first()
    .select("parkList.id", "parkList.park_name", "parkList.park_description", "rating.rating", "rating.comment", )
}

const findParkBy = filter => {
    return db("parkList")
    .join("rating", "parkList.id", "rating.park_id")
    .where({rating: filter}).first()
    .select("parkList.id", "parkList.park_name", "parkList.park_description", "rating.rating", "rating.comment", )
}

const getParks = () => {
    return db("parkList")
    .join("rating", "parkList.id", "rating.park_id")
    .select("parkList.id", "parkList.park_name", "parkList.park_description", "rating.rating", "rating.comment", )
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