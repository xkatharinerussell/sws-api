// Third Party Imports
import logger from 'loglevel';

// Local Imports
import { companiesDto } from "./companiesDto.js";
import { queryAllCompanies } from "../service/companyService.js";
import { getPagingData } from "./companyControllerHelper.js";

/* Controller functions for Companies */

const DEFAULT_LIMIT = 3;

// Controller function to get all companies
export const getCompanies = async (req, res) => {
    const { size, page } = req.query;
    try {
        // Query for all companies
        logger.info("Starting - get all companies")
        const { count, companies } = await queryAllCompanies(req);
        const pagingData = getPagingData(count, size ? size : DEFAULT_LIMIT, page);
        res.json(companiesDto(companies, pagingData, req.query));
        logger.info("Success - finished get all companies")
    }
    catch (err) {
        // TODO: return 500 error format better
        logger.error(`Error: ${err}`);
        res.status(500).json({
            status: 500, 
            code: "INTERNAL_SERVER_ERROR", 
            detail: err.message
        });
    }
}