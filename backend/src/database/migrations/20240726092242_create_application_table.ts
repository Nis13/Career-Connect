import { Knex } from 'knex';

const TABLE_NAME = 'application';


/**
 * Create table application.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .raw("CREATE TYPE application_status AS ENUM ('Applied', 'Under Review', 'Interview Scheduled', 'Rejected', 'Hired')")
  .createTable(TABLE_NAME, (table) => {
    table.bigIncrements("application_id").primary();

    table.bigInteger('job_id').notNullable().unsigned().references('listing_id').inTable("job_listings").onDelete("CASCADE");
    table.bigInteger('seeker_id').notNullable().unsigned().references('seeker_id').inTable("jobseeker").onDelete("CASCADE");

    table.text("cover_letter").notNullable();
    table.string("resume").notNullable();
    table.text("additional_message").nullable();
    table.enu('application_status', ['Applied', 'Under Review', 'Interview Scheduled', 'Rejected', 'Hired']).defaultTo('Applied').notNullable();
      
    table.timestamp('updated_at').nullable();
})
}
/**
 * Drop table application.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}