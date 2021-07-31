"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path = require('path');
dotenv_1.config({ path: path.resolve(__dirname, `./.env`) });
exports.default = {
    test: {
        client: 'pg',
        connection: process.env.DATABASE_URL_TEST,
        migrations: {
            directory: __dirname + '/postgres/migrations',
        },
        seeds: {
            directory: __dirname + '/postgres/seeds/test',
        },
    },
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL_DEVELOPMENT,
        migrations: {
            directory: path.resolve(__dirname, `./postgres/migrations`),
        },
        seeds: {
            directory: path.resolve(__dirname + '/postgres/seeds/development'),
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL_PRODUCTION,
        migrations: {
            directory: path.resolve(__dirname, `./postgres/migrations`),
        },
        seeds: {
            directory: path.resolve(__dirname + '/postgres/seeds/production'),
        },
    },
};
