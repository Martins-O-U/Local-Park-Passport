const db = require('../../database/db-config')


const addLink = (link) => {
    return db("facilityLink").insert(link, "id")
        .then(linked => {
            return linked;
        })
}

const findFacility = id => {
    return db('facilityLink')
    .join('facility', "facility.id", "facilityLink.id")
    .where({park_id: id})
    .select("facilityLink.id", "facility.facility_name", "facility.description")
}

const findfacilitykById = id => {
    return db("facilityLink")
    .join("facility", "facility.id", "facilityLink.facility_id")
    .join("parkList", "parkList.id", "facilityLink.park_id")
    .where({park_id: id})
}

const getFacilitylinked = () => {
    return db("facilityLink")
    .join("parkList", "parkList.id", "facilityLink.park_id")
    .join("facility", "facility.id", "facilityLink.park_id")
}

const updatefacilityLink = (changed, id) => {
    return db('facilityLink')
      .where({ id }).update(changed);
  }
  
  const removeFacilityLink = (id)  =>{
    return db('facilityLink')
        .where({id}).del();
  }

  module.exports = {
      getFacilitylinked,
      removeFacilityLink,
      updatefacilityLink,
      addLink,
      findFacility,
      findfacilitykById
  }