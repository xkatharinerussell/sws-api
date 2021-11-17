// Import Libraries
import express from "express";

// Local Imports
import { getCompanies } from "../controllers/companyController.js";
import { getCompaniesValidator } from "../validators/getCompaniesValidator.js";
import { validateRequest } from "../validators/validateRequest.js";

export const getRoutes = () => {
    // Initialise express router
    const router = express.Router();

    // Route to get all companies
    router.get('/companies', getCompaniesValidator, validateRequest, getCompanies);   
    return router;
}
