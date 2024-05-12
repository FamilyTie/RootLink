import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', function(table) {
            table.dropColumn('role')
    })

    // await knex.schema.alterTable('profiles', function(table){
    //     table.string('bio').nullable
    // })

   
    await knex.schema.alterTable('profiles', function(table){
            table.string('img')
    })
}


export async function down(knex: Knex): Promise<void> {
   
        await knex.schema.alterTable('users', function(table){
            table.string('role').notNullable().defaultTo('user')
        })
    await knex.schema.alterTable('profiles', function(table){
        table.dropColumn('img')
        // table.dropColumn('bio')
    })
   
    
}

