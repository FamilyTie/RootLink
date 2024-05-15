exports.up = function (knex) {
    return knex.raw(`
      ALTER TABLE comments
      ADD COLUMN comment_id INTEGER REFERENCES comments(id)
    `);
};
exports.down = function (knex) {
    return knex.raw(`
      ALTER TABLE comments
      DROP COLUMN comment_id
    `);
};
