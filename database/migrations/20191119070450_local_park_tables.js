exports.up = function(knex) {
    return knex.schema.createTable('usersList', users => {
        users.increments('id');    
        users.string('name', 128).notNullable()
        users.string('username', 128).notNullable()
        users.string('email', 128).notNullable()
        users.string('password', 128).notNullable();
    })
    .createTable('parkList', park => {
        park.increments("id");    
        park.string('name', 100).notNullable()
        park.string('city', 100).notNullable()
        park.string('country', 100).notNullable()
        park.string('description', 500).notNullable();
    })
    .createTable('rating', rating => {
        rating.increments("id");    
        rating.integer('rating', 2).notNullable()
        rating.string('comment', 150).notNullable()
        rating.integer('park_id').unsigned().notNullable().references('id')
                .inTable('parkList').onUpdate('CASCADE').onDelete('CASCADE');
        rating.integer('user_id').unsigned().notNullable().references('id')
                .inTable('usersList').onUpdate('CASCADE').onDelete('CASCADE');    
    })
      
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usersList')
        .dropTableIfExists('parkList')
        .dropTableIfExists('rating');
};