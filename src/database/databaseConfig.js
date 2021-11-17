
// Third Party Imports
import path from 'path';
const __dirname = path.resolve();

/* Configuration for database based on environment */

export const dbConfig = {
    development: {
        dialect: "sqlite",
        storage: path.join(__dirname, '../database/sws.sqlite3'),
        logging: false
    },
    test: {
        dialect: "sqlite",
        storage: path.join(__dirname, './database/sws-test.sqlite3'),
        logging: false
    },
    production: {},
}