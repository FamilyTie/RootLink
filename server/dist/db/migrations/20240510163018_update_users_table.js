"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('username');
        table.dropColumn('role');
        table.string('img');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.table('users', function (table) {
        table.string('username');
        table.string('role');
        table.dropColumn('img');
    });
}
exports.down = down;
