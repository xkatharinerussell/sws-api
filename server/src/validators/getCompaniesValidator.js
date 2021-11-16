import { query } from 'express-validator';

// Query params validator for get companies
export const getCompaniesValidator = [
    query('sharePrices').notEmpty().isIn([true, false]).withMessage("sharePrices should be true or false"),
    query('orderBy').optional().isIn(['score', 'volatility']).withMessage("orderBy should be one of [score, volatility]"),
    query('exchange').optional().isIn(['ASX', 'NYSE', 'NasdaqGS']).withMessage("exchange should be one of [ASX, NYSE, NasdaqGS]"),
    query('minScore').optional().isInt({min: 0}),
    query('maxScore').optional().isInt({max: 30}),
    query('size').optional().isInt(),
    query('page').optional().isInt()
];