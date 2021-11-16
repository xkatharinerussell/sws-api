import express from "express";
import logger from 'loglevel';

// Local imports
import { getRoutes } from "./routes.js";

export const startServer = () => {
    const app = express();
    // Mount routes on '/' path
    app.use('/', getRoutes());

    // Get Port number
    const port = process.env.SERVER_PORT || 8081;
    return new Promise(resolve => {
        const server = app.listen(port, () => {
          logger.info(`Server started, listening on port ${port}`);
        })

        // this block of code turns `server.close` into a promise API
        const originalClose = server.close.bind(server)
        server.close = () => {
            return new Promise(resolveClose => {
                originalClose(resolveClose);
            })
        }

        closeServerOnError(server);

        // resolve the whole promise with the express server
        resolve(server);
    })
}

// TODO: comment this section + figur out what is going on
const closeServerOnError = (server) => {
    async function exitHandler(options = {}) {
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
    
      //do something when app is closing
      process.on('exit', exitHandler)
    
      // catches ctrl+c event
      process.on('SIGINT', exitHandler.bind(null, {exit: true}))
    
      // catches "kill pid" (for example: nodemon restart)
      process.on('SIGUSR1', exitHandler.bind(null, {exit: true}))
      process.on('SIGUSR2', exitHandler.bind(null, {exit: true}))
    
      // catches uncaught exceptions
      process.on('uncaughtException', exitHandler.bind(null, {exit: true}))
}