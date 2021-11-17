// Third Party Imports
import { Sequelize } from "sequelize";

// Local imports
import { dbConfig } from "./databaseConfig.js";

/* Configure connection to Database */

const database = {};

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