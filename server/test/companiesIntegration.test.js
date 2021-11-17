// Third Party Imports
import request from 'supertest';

// Local Imports
import { startServer } from '../src/routes/server.js';
import database from '../src/database/database.js';

/* Integration tests to call GetCompanies Endpoint */

const { db } = database;
let baseUrl;
let server;

beforeAll(async () => {
    // Start server before each test run
    server = await startServer();
    baseUrl = `http://localhost:8081`;
})

afterAll(async () => {
    // Close database connection and server after each test run
    await db.close();
    server.close();
})

describe('Companies Endpoint', () => {
    it("Return error when invalid Query Params", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?exchange=ASXL&minScore=-1&maxScore=50&orderBy=total');

        // Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({status: 400, code: "INVALID_REQUEST", errors:[
            {location: "query", msg: "Invalid value", param: "sharePrices"},
            {location: "query", msg: "sharePrices should be true or false", param: "sharePrices"},
            {location: "query", msg: "orderBy should be one of [score, volatility]", param: "orderBy", value: "total"},
            {location: "query", msg: "exchange should be one of [ASX, NYSE, NasdaqGS]", param: "exchange", value: "ASXL"}, 
            {location: "query", msg: "Invalid value", param: "minScore", value: "-1"}, 
            {location: "query", msg: "Invalid value", param: "maxScore", value: "50"}
        ]});
    })

    it("Use default pagination", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?sharePrices=false');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBe(3);
        expect(response.body.currentPage).toBe(1);
        expect(response.body.totalPages).toBe(4);
    })

    it("Get results with specified pagination", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?sharePrices=false&size=4&page=2');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBe(4);
        expect(response.body.currentPage).toBe(2);
        expect(response.body.totalPages).toBe(3);
    })

    it("Get companies with Share Prices", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?sharePrices=true&size=1&page=1');
        
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.data[0].sharePrices).not.toBeUndefined();
    })

    it("Get companies ordered by volatility", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?sharePrices=false&orderBy=volatility&size=2&page=1');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.data[0].volatility).toBeLessThan(response.body.data[1].volatility);
    })

    it("Get companies ordered by score", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?sharePrices=false&orderBy=score&size=2&page=1');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.data[0].snowflakeScore.total).toBeLessThan(response.body.data[1].snowflakeScore.total);
    })

    it("Get companies in score range", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?sharePrices=false&minScore=10&maxScore=12&size=2&page=1');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.data[0].snowflakeScore.total).toBeGreaterThanOrEqual(10);
        expect(response.body.data[1].snowflakeScore.total).toBeGreaterThanOrEqual(10);
        expect(response.body.data[0].snowflakeScore.total).toBeLessThanOrEqual(12);
        expect(response.body.data[1].snowflakeScore.total).toBeLessThanOrEqual(12);
    })

    it("Get companies matching exchange", async () => {
        // Act
        const response = await request(baseUrl)
        .get('/company?sharePrices=false&exchange=ASX&size=2&page=1');

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.data[0].exchangeSymbol).toBe("ASX");
        expect(response.body.data[1].exchangeSymbol).toBe("ASX");
    })
})