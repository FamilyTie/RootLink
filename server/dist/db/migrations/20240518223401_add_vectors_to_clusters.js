"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.table('clusters', function (table) {
        table.json('bio_vector');
        table.json('feature_vector');
    });
};
exports.down = function (knex) {
    return knex.schema.table('clusters', function (table) {
        table.dropColumn('bio_vector');
        table.dropColumn('feature_vector');
    });
};
