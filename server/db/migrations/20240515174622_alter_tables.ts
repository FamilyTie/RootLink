import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('posts', (table) => {
        // Drop existing profile_id if it exists
        table.dropColumn('profile_id');
      });
      await knex.schema.alterTable('posts', (table) => {
        table.renameColumn('user_id', 'profile_id');
      });
    
      // Rename user_id to profile_id in comments table
      await knex.schema.alterTable('comments', (table) => {
        table.renameColumn('user_id', 'profile_id');
      });
    
      // Rename user_id to profile_id in post_likes table
      await knex.schema.alterTable('post_likes', (table) => {
        table.renameColumn('user_id', 'profile_id');
      });
    
      // Rename user_id to profile_id in comment_likes table
      await knex.schema.alterTable('comment_likes', (table) => {
        table.renameColumn('user_id', 'profile_id');
      });
    
      // Rename user_sent and user_received to profile_id_sent and profile_id_received in notifications table
      await knex.schema.alterTable('notifications', (table) => {
        table.renameColumn('user_sent', 'profile_id_sent');
        table.renameColumn('user_received', 'profile_id_received');
      });
    }
    


    export async function down(knex: Knex): Promise<void> {
      
        // Reverse renaming in posts table
        await knex.schema.alterTable('posts', (table) => {
          table.renameColumn('profile_id', 'user_id');
        });
      
        // Reverse renaming in comments table
        await knex.schema.alterTable('comments', (table) => {
          table.renameColumn('profile_id', 'user_id');
        });
      
        // Reverse renaming in post_likes table
        await knex.schema.alterTable('post_likes', (table) => {
          table.renameColumn('profile_id', 'user_id');
        });
      
        // Reverse renaming in comment_likes table
        await knex.schema.alterTable('comment_likes', (table) => {
          table.renameColumn('profile_id', 'user_id');
        });
      
        // Reverse renaming in notifications table
        await knex.schema.alterTable('notifications', (table) => {
          table.renameColumn('profile_id_sent', 'user_sent');
          table.renameColumn('profile_id_received', 'user_received');
        });
      }

