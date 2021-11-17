# Overview
This is an API that returns stock information on a number of global, listed companies. The API is built using Node.js runtime, Express and Sequelize ORM.

# Dependencies
The following depencendies must be installed on your local machine for the project to run:
- [Node.js](https://nodejs.org/en/) v17.x

# Running the project locally
Clone the repo:
``` git clone https://github.com/xkatharinerussell/sws-api.git```
Create a .env file inside /server folder. Specify environment variables:
```
NODE_ENV=test
SERVER_PORT=8081 
```
Install npm dependencies. This is run inside /server:
``` npm install ```
From inside the /server/src directory, you can start the application:
``` npn run start ```

# Running unit tests
Edit .env file inside /server folder. Specify environment to use test database:
``` NODE_ENV=test ```
Run command:
``` npm run test ```

# Project Structure
.
├── server
│   └── database: Contains sqlite database files for different environments
│   └── node_modules
│   └── spec: Contains API spec and design
│   └── src
│       ├── controllers:
│       ├── database:
│       ├── models:
│       ├── routes:
│       ├── service:
│       ├── validators:
│       ├── index.js:
│       ├── test: Contains integration tests
|
