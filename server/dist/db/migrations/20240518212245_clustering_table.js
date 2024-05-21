"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    //make table called clusters, with columns id, profile_id, cluster_id, created_at, updated_at
    return knex.schema.createTable('clusters', (table) => {
        table.increments('id').primary();
        table.integer('profile_id').unsigned().notNullable();
        table.integer('cluster_id').unsigned().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('clusters');
}
exports.down = down;
