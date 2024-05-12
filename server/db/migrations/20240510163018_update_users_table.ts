import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table) {
        table.dropColumn('username');
        table.dropColumn('role');
        table.string('img')
    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table) {
        table.string('username');
        table.string('role')
        table.dropColumn('img')
    })
}

