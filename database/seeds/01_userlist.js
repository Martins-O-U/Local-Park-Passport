exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usersList').del()
    .then(function () {
      // Inserts seed entries
      return knex('usersList').insert([
        {id: 1, fullname: 'John Doe', username: "John", email: "john@email.com", password: "xxyyzz"}
      ]);
    });
};
