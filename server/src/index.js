// Import connection
// import database from "./config/database.js";
// import { getCompanyById, getCompanies  } from "./controllers/companyController.js";

// Import express
import express from "express";
// Import cors
import cors from "cors";
// Import connection
// import db from "./config/database.js";
// Import router
// import { router } from "./routes/routes.js";
//import Router from './routes/routes.js';
import logger from 'loglevel'
import { startServer } from "./routes/server.js";
 
// Init express
// const app = express();
// // use express json
// app.use(express.json());
// // use cors
// app.use(cors());

// Testing database connection 
// try {
//     await database.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// use router
// app.use(Router);
// Set log level to info
logger.setLevel('info');
startServer();
 
// listen on port
//app.listen(3000, () => console.log('Server running at http://localhost:3000'));

// const test = async () => {
//     await getCompanies();
// }
// test();