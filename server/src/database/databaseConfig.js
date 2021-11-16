// TODO: use path
export const dbConfig = {
    development: {
        dialect: "sqlite",
        storage: './../database/sws.sqlite3',  // Path from context of index.js
        logging: false
    },
    test: {
        dialect: "sqlite",
        storage: './database/sws-test.sqlite3',
        logging: false
    },
    production: {},
}