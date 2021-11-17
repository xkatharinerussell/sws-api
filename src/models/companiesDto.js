import { getLastSharePrice, ninetyDayVolatility } from '../controllers/companyControllerHelper.js';

/* Functions to enforce API response structure */

export const companiesDto = (companies, pagingData, reqQuery) => {
    const { sharePrices, orderBy } = reqQuery;
    const res = {
        data:[],
        currentPage: undefined,
        totalPages: undefined
    };
    // Map companies into data
    res.data = companies.map((company) => ({
        id: company.id,
        companyName: company.name,
        exchangeSymbol: company.exchangeSymbol,
        uniqueSymbol: company.uniqueSymbol,
        lastSharePrice: getLastSharePrice(company),
        volatility: ninetyDayVolatility(company),
        snowflakeScore: company.swsCompanyScore,
        // Exclude share prices if 'sharePrices' query param is false
        sharePrices: sharePrices == "false" ? undefined : company.swsCompanyPriceCloses
    }));

    // Sort by price volatility over last 90 days.
    // TODO: Better solution would be to calculate rolling price volatility and store in the database
    if(orderBy === "volatility") {
        res.data.sort((a, b) => { return a.volatility - b.volatility; });
    }

    // Map pagination results
    res.currentPage = pagingData.currentPage;
    res.totalPages = pagingData.totalPages;
    return res;
}