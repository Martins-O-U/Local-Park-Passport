exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parkList').del()
    .then(function () {
      // Inserts seed entries
      return knex('parkList').insert([
        {id: 1, park_name: 'Abiola Park', city: "Lagos", country: "Nigeria", park_description: "A lovely place with great scenery, nature at its best"}
      ]);
    });
};
