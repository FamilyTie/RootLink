import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    //make table called clusters, with columns id, profile_id, cluster_id, created_at, updated_at
    return knex.schema.createTable('clusters', (table) => {
        table.increments('id').primary();
        table.integer('profile_id').unsigned().notNullable();
        table.integer('cluster_id').unsigned().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('clusters');
}

