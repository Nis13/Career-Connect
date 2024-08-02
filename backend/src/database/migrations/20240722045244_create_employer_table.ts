import { Knex } from 'knex';

const TABLE_NAME = 'employer';


/**
 * Create table employer.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('employer_id').primary();
    table.bigInteger("user_id").unsigned().references("user_id").inTable("users").onDelete("CASCADE");

    table.string("company_description").notNullable();
    table.string("logo").notNullable();
    table.string("employer_contact_no").notNullable();
    table.string("location").notNullable();
    

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      
    table.timestamp('updated_at').nullable();
  });
}

/**
 * Drop table employer.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}