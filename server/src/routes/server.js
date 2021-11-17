import express from "express";
import cors from "cors";
import logger from 'loglevel';

// Local imports
import { getRoutes } from "./routes.js";

const DEFAULT_PORT = 8081;
// Get Port number
const port = process.env.SERVER_PORT || DEFAULT_PORT;

export const startServer = () => {
    const app = express();
    // Use express json
    app.use(express.json());
    // Use cors
    app.use(cors());
    // Mount routes on '/' path
    app.use('/', getRoutes());

    return new Promise(resolve => {
        const server = app.listen(port, () => {
          logger.info(`Server started, listening on port ${port}`);
        })

        // Bind to 'server.close' to return a promise
        const boundClose = server.close.bind(server);
        server.close = () => {
            return new Promise(resolveClose => {
                boundClose(resolveClose);
            })
        }
        
        // Close server on any error events
        closeServerOnError(server);

        // Resolve the whole promise with the express server
        resolve(server);
    })
}

// Close the server gracefully for different situations
const closeServerOnError = (server) => {
    const handler = async (options = {}) => {
      await server
          .close()
          .then(() => {
            logger.info('Server successfully closed')
          })
          .catch(e => {
            logger.warn('Something went wrong closing the server', e.stack)
          })
    
        if (options.exit) process.exit()
    }
    
      // Deal with app closing 
      process.on('exit', handler)
    
      // Deal with ctrl+c event
      process.on('SIGINT', handler.bind(null, {exit: true}))
    
      // Deal with any "kill pid" events
      process.on('SIGUSR1', handler.bind(null, {exit: true}))
      process.on('SIGUSR2', handler.bind(null, {exit: true}))
    
      // Deal with any other events
      process.on('uncaughtException', handler.bind(null, {exit: true}))
}