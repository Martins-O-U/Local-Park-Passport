
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('facilityLink').del()
    .then(function () {
      // Inserts seed entries
      return knex('facilityLink').insert([
        {id: 1, park_id: 1, facility_id: 1},
        {id: 2, park_id: 1, facility_id: 2},
        {id: 3, park_id: 1, facility_id: 4},
        {id: 4, park_id: 1, facility_id: 6},
        {id: 5, park_id: 1, facility_id: 7},
        {id: 6, park_id: 1, facility_id: 9},

      ]);
    });
};
