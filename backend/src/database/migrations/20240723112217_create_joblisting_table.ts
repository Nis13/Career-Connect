import { Knex } from 'knex';

const TABLE_NAME = 'job_listings';


/**
 * Create table job_listings.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .raw("CREATE TYPE job_type AS ENUM ('Full-Time', 'Part-Time', 'Internship','Contract')")
  .raw("CREATE TYPE job_status AS ENUM ('Active', 'Inactive')")
  .createTable(TABLE_NAME, (table) => {
    table.bigIncrements('listing_id').primary();
    table.bigInteger('created_by').notNullable().unsigned().references('employer_id').inTable("employer").onDelete("CASCADE");

    table.string("title").notNullable();
    table.string("description").notNullable();
    table.text("requirements").notNullable();
    table.text("benefits").notNullable();
    table.string("location").notNullable();
    table.string("salary_range").notNullable();
    table.enu('job_type', ['Full-Time', 'Part-Time', 'Internship','Contract']).notNullable();
    table.enu('job_status', ['Active', 'Inactive']).defaultTo('Active').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      
    table.timestamp('updated_at').nullable();
  
})
}

/**
 * Drop table job_listings.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}