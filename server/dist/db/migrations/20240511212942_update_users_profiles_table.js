"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('users', function (table) {
        table.dropColumn('role');
    });
    // await knex.schema.alterTable('profiles', function(table){
    //     table.string('bio').nullable
    // })
    await knex.schema.alterTable('profiles', function (table) {
        table.string('img');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('users', function (table) {
        table.string('role').notNullable().defaultTo('user');
    });
    await knex.schema.alterTable('profiles', function (table) {
        table.dropColumn('img');
        // table.dropColumn('bio')
    });
}
exports.down = down;
