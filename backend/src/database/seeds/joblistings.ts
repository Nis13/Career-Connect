import { Knex } from 'knex';

const TABLE_NAME = 'job_listings';

/**
 * Delete existing entries and seed values for table job_listings.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        
      ]);
    });
}