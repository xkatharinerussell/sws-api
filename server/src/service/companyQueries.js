// Local Imports
import Score from "../models/score.js";
import SharePrice from "../models/sharePrice.js";

/* Basic components to build a query */
const DEFAULT_LIMIT = 3;
const DEFAULT_OFFSET = 0;

export const companiesBaseQuery = {
    attributes: [],
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    where: {},
    include: [],
    order: []
};

export const companiesAttributes = ['id', 'name', 'exchangeSymbol', 'uniqueSymbol'];

export const includeScore = {
    model: Score, 
    attributes:['total'],
    where: {}
};

export const includeSharePrices = {
    model: SharePrice,
    attributes:['date', 'price']
};
