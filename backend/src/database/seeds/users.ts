import { Knex } from 'knex';

const TABLE_NAME = 'users';

/**
 * Delete existing entries and seed values for table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          user_id:1,
          name:"admin",
          email:"admin@gmail.com",
          password:"$2b$10$Ecf7EjmJP4G7W2ifW1gwSeQPraXqZCp4T2lR3Dys1ufwzGcHe9f8S",
          role:'admin'
        }
      ]);
    });
}