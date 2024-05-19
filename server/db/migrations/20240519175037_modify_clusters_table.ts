import { Knex } from "knex";

exports.up = function(knex) {
    return knex.schema.table('clusters', function(table) {
      table.dropColumn('cluster_id');
      table.integer('group_id').unsigned().notNullable();
      table.dropColumn('feature_vector');
      table.string('ethnicity').notNullable();
      table.string('adoption_year').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('clusters', function(table) {
      table.dropColumn('group_id');
      table.dropColumn('ethnicity');
      table.dropColumn('adoption_year');
      table.integer('cluster_id').unsigned().notNullable();
      table.json('feature_vector').notNullable();
    });
  };

