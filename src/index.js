// Third Party Imports
import logger from 'loglevel'

// Local Imports
import { startServer } from "./routes/server.js";
 
// Set log level to info
logger.setLevel('info');

// Start Server
startServer();
 