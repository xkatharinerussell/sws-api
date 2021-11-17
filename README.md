## Overview
This is an API that returns stock information on a number of global, listed companies. The API is built using Node.js runtime, Express and Sequelize ORM.

## Dependencies
The following depencendies must be installed on your local machine for the project to run:
- [Node.js](https://nodejs.org/en/) v17.x

## Running the project locally
1. Clone the repo:\
``` git clone https://github.com/xkatharinerussell/sws-api.git```

2. Create a .env file at the root of application. Specify environment variables:\
NODE_ENV=development\
PORT=8081

3. Install npm dependencies:\
```npm install```

4. Start the application:\
``` npm run start ```

4. Hit the API endpoint at:\
http://localhost:8081/companies

## Running unit tests
Unit tests will run and automatically produce a coverage report.\
1. Edit .env file. Specify environment to use test database:\
``` NODE_ENV=test ```
2. Run command:\
``` npm run test ```

## Using the deployed API
This API has been deployed to Heroku for simplicity. The base path is: https://sws-application.herokuapp.com/companies. You can hit this API simply from the browser or a tool like Postman.
See **/spec/api.yml** for details on how to use this API.

Sample API Calls:
- https://sws-application.herokuapp.com/companies?sharePrices=true
- https://sws-application.herokuapp.com/companies?sharePrices=false&exchange=ASX&maxScore=12&orderBy=score&minScore=1&size=1&page=1

## Project Structure

. \
├── database: Contains sqlite database files for different environments\
├── src\
│   └── respository: Contains code related to setup db connection and data models\
│   └── controllers: Contains controller code to get data from service \
│   └── service: Logic to query database models\
│   └── models: Models used to represent data. e.g. DTO's\
│   └── routes: API routes\
│   └── validators: Request validators and middleware\
│   └── index.js: Entrypoint for the application\
│   └── test: Contains integration tests

## Future Tasks
- Increase unit testing
- Add authentication to API using JWT tokens
- Dockerize the application then deploy to Kubernetes (if looking to run application at a larger scale)
- Set up CI/CD pipeline for deployment
- Move API to sit behind Api Gateway

