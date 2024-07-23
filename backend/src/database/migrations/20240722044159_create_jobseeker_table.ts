import { Knex } from 'knex';

const TABLE_NAME = 'jobseeker';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('seeker_id').primary();
    table.bigInteger("user_id").unsigned().references("user_id").inTable("users").onDelete("CASCADE");

    table.string("education").notNullable();
    table.string("skills").notNullable();
    table.string("industry").notNullable();
    table.bigInteger("contact_no").notNullable();
    table.string("resume").nullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      
    table.timestamp('updated_at').nullable();
  
})
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}