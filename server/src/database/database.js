import { Sequelize } from "sequelize";
import { dbConfig } from "./databaseConfig.js";

const database = {};

/* Configure connection to Database */
const DEFAULT_ENV = "development";

// Get Environment 
const env = process.env.NODE_ENV || DEFAULT_ENV;

// Create database based on environment
const sequelizeDb = new Sequelize(dbConfig[env]);

// The database instance
database.db = sequelizeDb;
// Sequelize library
database.Sequelize = Sequelize;

export default database;