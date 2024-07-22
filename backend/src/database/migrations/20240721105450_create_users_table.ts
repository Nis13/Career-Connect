import { Knex } from 'knex';

const TABLE_NAME = 'users';


/**
 * Create table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary();
    table.string('name', 50).notNullable().unique();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('role', 50).notNullable();
    
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.bigInteger('created_by').unsigned().nullable().references('id').inTable(TABLE_NAME);
    table.timestamp('updated_at').nullable();
    table.bigInteger('updated_by').unsigned().references('id').inTable(TABLE_NAME).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}