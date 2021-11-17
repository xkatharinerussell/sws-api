// Third Party Imports
import logger from 'loglevel';

// Local Imports
import Company from "../models/company.js";
import { companiesBaseQuery, companiesAttributes, includeScore, includeSharePrices } from "./companyQueries.js"

import { Sequelize } from "sequelize";
const { Op } = Sequelize;

// Query for all companies from Database
export const queryAllCompanies = async (req) => {
    const {
        minScore,
        maxScore,
        exchange,
        orderBy,
        size,
        page
    } = req.query;

    // Construct Base Query
    let query = JSON.parse(JSON.stringify(companiesBaseQuery)); 
    query.attributes = companiesAttributes;
    query.include.push(includeScore, includeSharePrices);

    // Add Filters to Query
    if(page !== undefined && size !== undefined) {
        const limit = size ? + size : 3;
        const offset = page ? (page - 1) * limit : 0;
        query.limit = limit;
        query.offset = offset;
    }

    if(exchange !== undefined) {
        // Filter by exchange symbol
        query.where = { exchangeSymbol: {[Op.eq]: exchange} };
    }

    if(minScore !== undefined && maxScore !== undefined) {
        // Filter by company score in a range
        query.include[0].where = { total: { [Op.between]: [minScore, maxScore] } };
    }

    if(orderBy !== undefined && orderBy === "score") {
        // Order by company score
        query.order = [[Sequelize.literal('`swsCompanyScore.total`'), 'ASC']];
    }
    
    try {
        // Query for all companies from Database
        const companies = await Company.findAll(query);
        
        // Query again without limit and offset to get the total number of companies returned from the query.
        /* TODO: find a better way to this. This is a workaround for sequelize findAndCountAll function returning the incorrect count
         * This count is required for pagination to work.
        */
        delete(query.limit);
        delete(query.offset);
        const countCompanies = await Company.findAll(query);
        const count = countCompanies.length;
        return { count, companies };
    } catch (err) {
        logger.error(`Failed to query for companies.`, err.stack);
        throw err;
    }
}