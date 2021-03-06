import Knex from 'knex';
import knexfile from '../knexfile';
const environment = process.env.NODE_ENV || 'development';

const config = knexfile[environment];

export default Knex(config);
