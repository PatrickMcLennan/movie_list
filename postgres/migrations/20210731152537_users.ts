import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(`users`, (table) => {
    table.increments();
    table.string(`email`);
    table.string(`first_name`);
    table.string(`last_name`);
    table.timestamp(`created_at`).defaultTo(knex.fn.now());
    table.timestamp(`updated_at`).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(`users`);
}
