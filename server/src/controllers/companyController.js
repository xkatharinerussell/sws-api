import logger from 'loglevel';

import Company from "../models/company.js";
import { companiesDto } from "./companiesDto.js";
import { queryAllCompanies } from "../service/companyService.js";
import { getPagingData } from "./companyControllerHelper.js";

const DEFAULT_LIMIT = 3;

// TODO: delete
// export const getCompanyById = async (req, res) => {
//     try {
//         const company = await Company.findAll({
//             where: {
//                 id: "46B285BC-B25F-4814-985C-390A4BFA2023"
//             }
//         });
//         console.log(company[0]);
//         res.send(company[0]);
//     } catch (err) {
//         console.log(err);
//     }
// }

// Controller function to get all companies
export const getCompanies = async (req, res) => {
    const { size, page } = req.query;
    try {
        // Query for all companies
        logger.info("Starting - get all companies")
        const { count, companies } = await queryAllCompanies(req);
        const pagingData = getPagingData(count, size ? size : DEFAULT_LIMIT, page);
        res.json(companiesDto(companies, pagingData, req.query));
        logger.info("Finished - get all companies")
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