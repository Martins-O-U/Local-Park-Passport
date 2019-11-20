exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rating').del()
    .then(function () {
      // Inserts seed entries
      return knex('rating').insert([
        {id: 1, rating: 4, comment: "A place tobe eith family and friends", park_id: 1, user_id: 1}
      ]);
    });
};
