const db = require('../../database/db-config')



const addRating = (user) => {
    return db("rating").insert(user, "id")
        .then(rated => {
            return rated;
        })
}

const findRatingById = id => {
    return db("rating")
    .join("parkList", "parkList.id", "rating.park_id")
    .where({park_id: id}).first()
    .select('rating.id',"rating.rating", "rating.comment", "parkList.park_name", "parkList.park_description")
}

const findRatingBy = filter => {
    return db("rating").where(filter);
}

const getRating = () => {
    return db("rating")
    .join("usersList", "usersList.id", "rating.user_id")
    .join("parkList", "parkList.id", "rating.park_id")
    .select('rating.id',"rating.rating", "rating.comment", "parkList.park_name", "parkList.park_description")
}

const updateRating = (changed, id) => {
    return db('rating')
      .where({ id }).update(changed);
  }
  
  const removeRating = (id)  =>{
    return db('rating')
        .where({id}).del();
  }

module.exports = {
    addRating,
    findRatingById, 
    findRatingBy,
    getRating,
    updateRating,
    removeRating
}