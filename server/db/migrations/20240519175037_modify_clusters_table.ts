import { Knex } from "knex";

exports.up = function(knex: Knex) {
  return knex.schema.table('clusters', function(table) {
      table.dropColumn('cluster_id');
      table.dropColumn('feature_vector');
      table.integer('group_id').unsigned().notNullable();
      table.string('ethnicity').notNullable();
      table.string('adoption_year').notNullable();
  });
};

exports.down = async function(knex: Knex) {
  await knex.schema.table('clusters', function(table) {
      table.integer('cluster_id').unsigned();
      table.json('feature_vector');
  });

  // Update existing rows to have default values
  await knex('clusters').update({
      cluster_id: knex.raw('COALESCE(cluster_id, 0)'),
      feature_vector: knex.raw('COALESCE(feature_vector, \'{}\')')
  });

  return knex.schema.table('clusters', function(table) {
      table.integer('cluster_id').unsigned().notNullable().alter();
      table.json('feature_vector').notNullable().alter();
      table.dropColumn('group_id');
      table.dropColumn('ethnicity');
      table.dropColumn('adoption_year');
  });
};
